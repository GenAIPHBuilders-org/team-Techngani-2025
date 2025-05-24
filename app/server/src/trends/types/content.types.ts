export interface ContentSuggestion {
  title: string;
  description: string;
  funFactor: number;
  implementation: string;
}

export interface ContentOverview {
  overview: string;
  suggestions: ContentSuggestion[];
  mood: string;
  engagementTips: string[];
}
