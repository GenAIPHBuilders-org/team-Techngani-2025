import { BACKEND_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

// Mock detailed reports for development purposes
const mockReports: Record<string, Record<number, any>> = {
  "digital marketing": {
    0: {
      overview:
        "AI tools are transforming digital marketing with 78% of marketers reporting increased efficiency and a 45% boost in campaign performance according to recent industry surveys. The market for AI marketing tools is expected to grow by 29% in 2024.",
      outline: [
        {
          title: "Current AI Marketing Landscape",
          points: [
            "Overview of major AI marketing tool categories",
            "Key players and market leaders in the space",
            "Adoption rates across different industry sectors",
          ],
        },
        {
          title: "Top 10 AI Tools Analysis",
          points: [
            "Detailed breakdown of each tool's capabilities",
            "Pricing comparisons and ROI calculations",
            "Real-world case studies and success metrics",
          ],
        },
        {
          title: "Implementation Strategies",
          points: [
            "Step-by-step integration guide for marketing teams",
            "Common implementation challenges and solutions",
            "Future-proofing your marketing stack",
          ],
        },
        {
          title: "Ethical Considerations",
          points: [
            "Data privacy implications for AI marketing",
            "Transparency and disclosure best practices",
            "Balancing automation with human creativity",
          ],
        },
      ],
      keywords: [
        "AI marketing tools",
        "marketing automation",
        "machine learning for marketers",
        "predictive analytics",
        "AI content generation",
        "personalization technology",
        "marketing ROI optimization",
        "customer journey AI",
        "digital marketing automation",
        "AI campaign analysis",
      ],
      multimedia: [
        {
          type: "Infographic",
          description:
            "Visual comparison of top 10 AI marketing tools with key features and pricing tiers",
          placement: "After the introduction of the Top 10 Tools section",
        },
        {
          type: "Video",
          description:
            "2-3 minute screencast demonstrating the use of leading AI tools in a marketing workflow",
          placement: "Within the Implementation Strategies section",
        },
        {
          type: "Chart",
          description:
            "Bar chart showing adoption rates of AI marketing tools by industry and company size",
          placement: "In the Current AI Marketing Landscape section",
        },
        {
          type: "Interactive",
          description:
            "ROI calculator tool that readers can use to estimate potential returns from implementing AI tools",
          placement: "Near the end of the article as a call-to-action",
        },
      ],
      checklist: [
        "Identify 3-5 marketing specialists to interview about their experiences with these AI tools",
        "Request demo access to the top 3 tools for hands-on testing",
        "Create comparison spreadsheet with detailed feature and pricing analysis",
        "Develop custom graphics illustrating the marketing workflow with AI integration",
        "Outline key takeaways for different company sizes and marketing maturity levels",
      ],
    },
    // Add other reports for this niche as needed
  },
  "web3 technologies": {
    2: {
      overview:
        "NFTs are evolving beyond digital art, with utility-focused applications growing 182% in the past year. Enterprise adoption of NFT technology for authentication, ticketing, and membership services has increased 64% as the technology matures beyond speculative collectibles.",
      outline: [
        {
          title: "Evolution of NFT Applications",
          points: [
            "Historical progression from digital art to utility",
            "Key technology innovations enabling new use cases",
            "Notable shifts in market sentiment and investor focus",
          ],
        },
        {
          title: "Real-World NFT Utility Categories",
          points: [
            "Digital identity and credential verification",
            "Ticketing and event access control systems",
            "Membership and loyalty programs",
            "Real estate and property rights tokenization",
            "Supply chain tracking and authenticity verification",
          ],
        },
        {
          title: "Case Studies of Successful Implementation",
          points: [
            "Enterprise adoption examples and outcomes",
            "Consumer-facing applications gaining traction",
            "ROI and performance metrics from implementations",
            "Lessons learned and best practices",
          ],
        },
        {
          title: "Technical and Regulatory Considerations",
          points: [
            "Blockchain infrastructure comparisons for NFT utility",
            "Interoperability challenges and solutions",
            "Regulatory landscape affecting utility NFTs",
            "Security and privacy implications",
          ],
        },
      ],
      keywords: [
        "NFT utility",
        "blockchain applications",
        "digital authentication",
        "web3 loyalty programs",
        "tokenized assets",
        "smart contracts",
        "digital identity verification",
        "NFT ticketing",
        "enterprise blockchain",
        "decentralized applications",
      ],
      multimedia: [
        {
          type: "Diagram",
          description:
            "Visual flowchart showing how NFTs function in an authentication system compared to traditional methods",
          placement: "In the introduction to establish context for readers",
        },
        {
          type: "Case Study Video",
          description:
            "Interview with a company that has successfully implemented NFTs for a real-world application",
          placement: "Within the Case Studies section to provide credibility",
        },
        {
          type: "Infographic",
          description:
            "Timeline showing the evolution of NFT use cases from 2017 to present day",
          placement: "At the beginning of the Evolution section",
        },
        {
          type: "Interactive Demo",
          description:
            "Simple embedded demonstration of NFT verification process for tickets or credentials",
          placement: "In the Real-World NFT Utility Categories section",
        },
      ],
      checklist: [
        "Research and compile database of at least 15 companies using NFTs for utility beyond art",
        "Reach out to 3-5 companies for potential case study interviews",
        "Create technical diagrams illustrating authentication and verification processes",
        "Draft comparison matrix of different blockchain platforms for utility NFTs",
        "Consult legal expert on regulatory considerations for different utility applications",
      ],
    },
    // Add other reports for this niche as needed
  },
};

// Default mock report for any niche/index combination not explicitly defined
const defaultReport = {
  overview:
    "This topic has seen significant growth in the past quarter, with search interest increasing by 43% according to Google Trends data. Social media engagement around this subject has doubled since January, indicating strong audience interest and content opportunity.",
  outline: [
    {
      title: "Current State and Background",
      points: [
        "Historical context and evolution of the topic",
        "Key players and influencers in the space",
        "Recent developments and notable milestones",
      ],
    },
    {
      title: "Key Trends and Analysis",
      points: [
        "Primary trend drivers and market forces",
        "Data-backed insights on audience interest",
        "Regional and demographic variations in adoption",
      ],
    },
    {
      title: "Practical Applications",
      points: [
        "Real-world examples and case studies",
        "Implementation strategies and best practices",
        "Common challenges and how to overcome them",
      ],
    },
    {
      title: "Future Outlook",
      points: [
        "Predicted developments in the next 6-12 months",
        "Emerging opportunities and potential risks",
        "Expert opinions and industry forecasts",
      ],
    },
  ],
  keywords: [
    "trending topic",
    "industry innovation",
    "market analysis",
    "strategic insight",
    "future trends",
    "best practices",
    "case study",
    "implementation guide",
    "expert advice",
    "comprehensive overview",
  ],
  multimedia: [
    {
      type: "Infographic",
      description: "Visual summary of key statistics and trend data",
      placement: "After the introduction to establish context",
    },
    {
      type: "Chart",
      description: "Growth trend visualization showing YoY comparison",
      placement: "In the Key Trends section to support data points",
    },
    {
      type: "Image",
      description: "Relevant visual examples of the topic in action",
      placement: "Throughout the Practical Applications section",
    },
    {
      type: "Video",
      description: "Brief explainer or demonstration of key concepts",
      placement: "Near the beginning to engage visual learners",
    },
  ],
  checklist: [
    "Gather the latest statistical data from reliable industry sources",
    "Interview at least 2-3 subject matter experts for unique insights",
    "Identify and analyze 3-5 successful case studies",
    "Create custom graphics to illustrate key concepts visually",
    "Develop a promotion strategy focused on relevant industry channels",
  ],
};

export async function POST(request: Request) {
  try {
    const { niche, selectedIndex } = await request.json();

    // In a real implementation, this would call your NestJS backend API
    // which would then use the AI prompt with GPT-4 or similar

    // For demo purposes, we'll use mock data
    // const lowercaseNiche = niche.toLowerCase();

    // Find the closest match in our mock data
    // const matchingNiche = Object.keys(mockReports).find(
    //   (key) => lowercaseNiche.includes(key) || key.includes(lowercaseNiche)
    // );

    // If we have a specific report for this niche and index, use it
    // // if (matchingNiche && mockReports[matchingNiche][selectedIndex]) {
    ////    return NextResponse.json(mockReports[matchingNiche][selectedIndex]);
    // // }

    // Otherwise return the default report
    // return NextResponse.json(defaultReport);

    // In production, this would be:
    // Make request to NestJS backend
    const response = await fetch(`${BACKEND_URL}/trends/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ niche, selectedIndex }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating trend report:", error);
    return NextResponse.json(
      { error: "Failed to generate trend report" },
      { status: 500 }
    );
  }
}
