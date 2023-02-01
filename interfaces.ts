export interface ElasticResultData {
  answer: ElasticResult[];
}

export interface ElasticResult {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: ElasticDocument;
}

export interface ElasticDocument {
  refresh: string;
  txt: string;
  title: string;
}
