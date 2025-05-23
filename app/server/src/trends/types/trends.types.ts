export interface TitleResponse {
  titles: string[];
}

export interface ReportResponse {
  overview: string;
  outline: {
    title: string;
    points: string[];
  }[];
  keywords: string[];
  multimedia: {
    type: string;
    description: string;
    placement: string;
  }[];
  checklist: string[];
}
