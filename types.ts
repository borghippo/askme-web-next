export interface AskMeResultData {
  query: {
    question: string;
  };
  documents: AskMeDocument[];
  duration: number;
}

export interface AskMeDocument {
  identifier: string;
  title: string;
  summary: string;
  url: string;
  score: number;
  nscore: number;
}

export enum DisplayMode {
  Normal,
  Related,
  Entity,
}
