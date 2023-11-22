export interface AskMeResultData {
  query: {
    question: string;
  };
  documents: AskMeDocumentMultiple[];
  duration: number;
}

export interface AskMeRelatedData {
  query: {
    doc_id: string;
    terms: string;
  };
  documents: AskMeDocumentMultiple[];
}

export interface AskMeSet {
  query: {
    index: string;
    ids: string;
  };
  documents: AskMeDocumentMultiple[];
  terms: [tfIdf: number, count: number, name: string][];
}

export interface AskMeDocumentMultiple {
  identifier: string;
  score: number;
  nscore: number;
  domain: string;
  year: number;
  title: string;
  url: string;
  authors: string[];
  summary: string;
}

export interface AskMeDocumentSingle {
  identifier: string;
  domain: string;
  year: number;
  title: string;
  url: string;
  authors: string[];
  summary: string;
  terms: [name: number, count: number, tfIdf: number][];
}
