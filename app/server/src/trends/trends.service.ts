import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { TitleResponse, ReportResponse } from './types/trends.types';
import { ContentOverview, ContentSuggestion } from './types/content.types';

@Injectable()
export class TrendsService {
  private readonly logger = new Logger(TrendsService.name);
  private readonly aiClient: OpenAI;
  private readonly sources = [
    'https://news.google.com',
    'https://www.reddit.com/r/trending',
    'https://trends.google.com',
    'https://www.quora.com/topic',
  ];

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    const endpoint = 'https://models.github.ai/inference';

    this.aiClient = new OpenAI({
      baseURL: endpoint,
      apiKey: token,
    });

    this.logger.log('AI agent initialized');
  }

  async analyzeContent(niche: string): Promise<ContentOverview> {
    try {
      this.logger.log(`Analyzing content for niche: ${niche}`);

      const prompt = `
        You are a fun and creative content strategist AI! I need your help to analyze the niche "${niche}" and provide engaging content suggestions.
        
        Please provide a response in the following JSON format:
        {
          "overview": "A fun, upbeat 2-3 sentence overview of the niche and its current state",
          "suggestions": [
            {
              "title": "Creative suggestion title",
              "description": "Fun description of the suggestion",
              "funFactor": 8, // Rate how fun/entertaining this suggestion would be (1-10)
              "implementation": "Step-by-step guide on how to implement this fun idea"
            }
            // Provide 3-5 suggestions
          ],
          "mood": "Overall mood/tone recommendation for content in this niche",
          "engagementTips": [
            "Fun tip 1 for increasing engagement",
            "Fun tip 2 for increasing engagement",
            "Fun tip 3 for increasing engagement"
          ]
        }

        Make sure your suggestions are:
        1. Entertaining and fun to watch/read
        2. Easy to implement
        3. Engaging for the audience
        4. Include elements of humor where appropriate
        
        Return only the JSON object, no additional commentary.
      `;

      const aiResponse = await this.callAiService(prompt);
      return this.parseContentOverview(aiResponse);
    } catch (error) {
      this.logger.error(`Error analyzing content: ${error.message}`);
      throw error;
    }
  }

  async analyzeTrends(niche: string): Promise<TitleResponse> {
    try {
      this.logger.log(`Analyzing trends for niche: ${niche}`);

      // First, gather data from various sources
      const webData = await this.gatherWebData(niche);

      // Create a comprehensive prompt with the gathered data
      const prompt = `
        You are an advanced trend analyzer AI. I've gathered some data about the niche "${niche}" from various sources.
        Here's what I found:

        ${webData}

        Based on this data and your knowledge, please:
        1. Analyze the current trends and patterns
        2. Identify emerging opportunities
        3. Consider market gaps and potential angles
        
        Return exactly 5 high-potential content titles (headlines) formatted as a JSON array of strings.
        Each title should be unique, compelling, and based on real trends or opportunities you've identified.
        
        Do not include any commentary or explanations—just return the JSON array.
      `;

      const aiResponse = await this.callAiService(prompt);
      return { titles: this.extractTitlesFromAiResponse(aiResponse) };
    } catch (error) {
      this.logger.error(`Error analyzing trends: ${error.message}`);
      throw error;
    }
  }

  async generateReport(
    niche: string,
    selectedIndex: number,
  ): Promise<ReportResponse> {
    try {
      this.logger.log(
        `Generating report for niche: ${niche}, index: ${selectedIndex}`,
      );

      const { titles } = await this.analyzeTrends(niche);
      const selectedTitle = titles[selectedIndex];

      if (!selectedTitle) {
        throw new Error(`Invalid index: ${selectedIndex}`);
      }

      // Gather more detailed data for the specific topic
      const detailedData = await this.gatherDetailedData(selectedTitle, niche);

      const prompt = `
        You are an advanced trend analyzer AI. I've gathered detailed data about the topic "${selectedTitle}" in the niche "${niche}".
        Here's what I found:

        ${detailedData}

        Based on this data and your analysis, provide a concise but comprehensive overview of the current trends and opportunities.
        Focus on:
        1. Current market state and trends
        2. Key opportunities and potential
        3. What makes this topic relevant now
        
        Return a single, well-structured paragraph (2-3 sentences) that captures the essence of the trend.
        Do not include any additional sections or commentary - just the overview paragraph.
      `;

      const aiResponse = await this.callAiService(prompt);
      return { overview: aiResponse.trim() };
    } catch (error) {
      this.logger.error(`Error generating report: ${error.message}`);
      throw error;
    }
  }

  private async gatherWebData(niche: string): Promise<string> {
    try {
      const dataPromises = this.sources.map((source) =>
        this.scrapeSource(source, niche),
      );
      const results = await Promise.allSettled(dataPromises);

      const successfulResults = results
        .filter(
          (result): result is PromiseFulfilledResult<string> =>
            result.status === 'fulfilled',
        )
        .map((result) => result.value);

      return successfulResults.join('\n\n');
    } catch (error) {
      this.logger.error(`Error gathering web data: ${error.message}`);
      return '';
    }
  }

  private async gatherDetailedData(
    title: string,
    niche: string,
  ): Promise<string> {
    try {
      // Search for specific content related to the title
      const searchQueries = [
        `${title} ${niche} news`,
        `${title} ${niche} statistics`,
        `${title} ${niche} analysis`,
      ];

      const dataPromises = searchQueries.map((query) =>
        this.searchAndScrape(query),
      );

      const results = await Promise.allSettled(dataPromises);

      const successfulResults = results
        .filter(
          (result): result is PromiseFulfilledResult<string> =>
            result.status === 'fulfilled',
        )
        .map((result) => result.value);

      return successfulResults.join('\n\n');
    } catch (error) {
      this.logger.error(`Error gathering detailed data: ${error.message}`);
      return '';
    }
  }

  private async scrapeSource(url: string, niche: string): Promise<string> {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Extract relevant content based on the source
      let content = '';

      if (url.includes('news.google.com')) {
        content = $('article')
          .map((_, el) => $(el).text())
          .get()
          .join('\n');
      } else if (url.includes('reddit.com')) {
        content = $('.Post')
          .map((_, el) => $(el).text())
          .get()
          .join('\n');
      } else if (url.includes('quora.com')) {
        content = $('.q-box')
          .map((_, el) => $(el).text())
          .get()
          .join('\n');
      }

      return `Data from ${url}:\n${content}`;
    } catch (error) {
      this.logger.error(`Error scraping ${url}: ${error.message}`);
      return '';
    }
  }

  private async searchAndScrape(query: string): Promise<string> {
    try {
      // Implement search functionality (you might want to use a search API)
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      const response = await axios.get(searchUrl);
      const $ = cheerio.load(response.data);

      // Extract search results
      const results = $('.g')
        .map((_, el) => $(el).text())
        .get()
        .join('\n');

      return `Search results for "${query}":\n${results}`;
    } catch (error) {
      this.logger.error(`Error searching and scraping: ${error.message}`);
      return '';
    }
  }

  private async callAiService(prompt: string): Promise<string> {
    try {
      const response = await this.aiClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'You are a fun and creative content strategist AI with expertise in making content engaging and enjoyable.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
        top_p: 1.0,
        model: 'openai/gpt-4.1',
      });

      return response.choices[0].message.content;
    } catch (error) {
      this.logger.error(`AI service call failed: ${error.message}`);
      throw new Error(`Failed to call AI service: ${error.message}`);
    }
  }

  private extractTitlesFromAiResponse(response: string): string[] {
    try {
      // Try to parse the entire response as JSON
      const jsonResponse = JSON.parse(response);

      // Check if it's already an array of strings
      if (
        Array.isArray(jsonResponse) &&
        jsonResponse.every((item) => typeof item === 'string')
      ) {
        return jsonResponse.slice(0, 5); // Ensure we have exactly 5 titles
      }

      // If we got here, the response is not in the expected format
      this.logger.warn(`AI response not in expected format: ${response}`);

      // As a fallback, look for something that resembles a JSON array in the text
      const arrayMatch = response.match(/\[(.*?)\]/s);
      if (arrayMatch) {
        try {
          const array = JSON.parse(arrayMatch[0]);
          if (Array.isArray(array)) {
            return array.filter((item) => typeof item === 'string').slice(0, 5);
          }
        } catch (e) {
          // If this fails, continue to the fallback
          this.logger.error(
            `Failed to parse array from response: ${e.message}`,
          );
        }
      }

      // Last resort: extract anything that looks like a title
      // This is very naive and should be improved
      const lines = response.split('\n');
      const titles = lines
        .map((line) => line.trim())
        .filter(
          (line) =>
            line.length > 10 && !line.includes('{') && !line.includes('}'),
        )
        .slice(0, 5);

      if (titles.length > 0) {
        return titles;
      }

      // If all else fails, return a default message
      return [
        'Failed to generate titles from AI response',
        'Please try again with a different niche',
        'Consider providing more specific details',
        'Check system configuration',
        'Contact support if the issue persists',
      ];
    } catch (error) {
      this.logger.error(`Error extracting titles: ${error.message}`);
      throw new Error(
        `Failed to extract titles from AI response: ${error.message}`,
      );
    }
  }

  private parseContentOverview(response: string): ContentOverview {
    try {
      return JSON.parse(response);
    } catch (error) {
      this.logger.error(`Error parsing content overview: ${error.message}`);
      return {
        overview:
          "Oops! Something went wrong, but don't worry - we're still having fun!",
        suggestions: [
          {
            title: "The Classic 'Try Again' Dance",
            description: 'When in doubt, do a little dance and try again!',
            funFactor: 10,
            implementation:
              '1. Do a happy dance\n2. Refresh the page\n3. Try your request again',
          },
        ],
        mood: 'Keep smiling!',
        engagementTips: [
          'Remember to keep your content light and fun!',
          "Don't be afraid to show your personality",
          "Engage with your audience like they're friends",
        ],
      };
    }
  }
}
