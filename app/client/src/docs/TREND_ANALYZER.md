# Trend Analyzer Feature Documentation

## Overview

The Trend Analyzer is an AI-powered feature that helps users discover trending content ideas in any niche or topic. It leverages advanced language models to analyze current trends and generate detailed content plans.

## Features

- **Trend Discovery**: Enter any niche or topic to discover 5 trending content ideas
- **Detailed Reports**: Select a trending title to get a comprehensive content plan including:
  - Data-driven overview of the trend
  - Content outline with sections and bullet points
  - SEO keywords for optimization
  - Multimedia suggestions for engagement
  - Production checklist for implementation

## User Flow

1. User enters a topic or niche in the input field
2. System generates 5 trending content titles
3. User selects one of the titles
4. System generates a detailed report for the selected title

## Technical Implementation

### Frontend Components

- `TrendAnalyzer.tsx`: Main component handling user interaction and display
- API integration via `/api/trends/analyze` and `/api/trends/report` endpoints
- Uses Shadcn UI components for consistent styling

### Backend Implementation

#### NestJS Server

- `TrendsController`: Handles HTTP requests for trend analysis
- `TrendsService`: Business logic for interacting with AI services
- DTOs for input validation

#### AI Integration

The system uses a carefully crafted AI prompt to generate structured content recommendations:

```
You are a trend analyzer AI. I will give you a topic or niche, and you must:

Crawl and analyze the top public sources on the internet (blogs, news sites, social media, YouTube) to identify current trending angles in that niche.

Return exactly 5 high-potential content titles (headlines) formatted as a JSON array of strings.

Wait for me to select one of those titles by its array index.

Upon selection, generate a detailed report for the chosen title, including:

A 2–3 sentence overview of why this topic is trending now (data-driven).
A suggested outline (3–5 sections) with bullet points for each.
Relevant keywords and search terms to optimize SEO.
Suggested multimedia elements (images, video clips, charts) and where to insert them.
A short "next-step" checklist for content production.

Requirements:
Always output valid JSON.
Keep the initial response limited to the 5 titles array.
After I send { "selectedIndex": <0–4> }, respond only with the detailed report JSON object.
Do not include any extra commentary or apologies—just structured JSON.
```

## Data Structure

### Trend Titles Response

```json
{
  "titles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]
}
```

### Detailed Report Response

```json
{
  "overview": "Data-driven overview of why this topic is trending now",
  "outline": [
    {
      "title": "Section Title",
      "points": ["Bullet point 1", "Bullet point 2", "Bullet point 3"]
    }
    // 3-5 sections total
  ],
  "keywords": ["keyword1", "keyword2", "keyword3", "etc"],
  "multimedia": [
    {
      "type": "Type (Image, Video, Chart, etc)",
      "description": "Description of the multimedia element",
      "placement": "Where to insert it in the content"
    }
    // 3-5 multimedia suggestions
  ],
  "checklist": [
    "Step 1 for content production",
    "Step 2 for content production",
    "Step 3 for content production",
    "etc"
  ]
}
```

## Configuration

### Environment Variables

The following environment variables are required for the AI integration:

- `AI_API_KEY`: Your API key for the AI service
- `AI_API_URL`: The endpoint URL for the AI service

## Usage Examples

### Niche: Digital Marketing

**Example Titles:**

1. "10 AI Tools Revolutionizing Digital Marketing in 2024"
2. "The End of Third-Party Cookies: What Marketers Need to Know"
3. "Voice Search Optimization: The Complete Guide for Digital Marketers"
4. "How Social Commerce Is Changing the E-commerce Landscape"
5. "Privacy-First Marketing Strategies That Actually Work"

**Example Report for Title 1:**

```json
{
  "overview": "AI tools are transforming digital marketing with 78% of marketers reporting increased efficiency and a 45% boost in campaign performance according to recent industry surveys. The market for AI marketing tools is expected to grow by 29% in 2024.",
  "outline": [
    {
      "title": "Current AI Marketing Landscape",
      "points": [
        "Overview of major AI marketing tool categories",
        "Key players and market leaders in the space",
        "Adoption rates across different industry sectors"
      ]
    }
    // Additional sections...
  ]
  // Rest of the report...
}
```

## Future Enhancements

- **Content Generation**: Expand the feature to generate full article drafts
- **Competitive Analysis**: Add competitor content analysis
- **Trend Alerts**: Create a notification system for emerging trends in selected niches
- **Historical Data**: Add trend history and forecasting capabilities
- **Integration with Publishing**: Direct connection to content management systems
