export interface AskMeResultData {
  query: {
    question: string;
  };
  documents: AskMeDocument[];
  duration: number;
}

export interface AskMeDocument {
  id?: string;
  title?: {
    text: string;
  };
  articleAbstract?: {
    text: string;
  };
  url?: string;
}
