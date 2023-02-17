export const getQueryString = (corpus: string, query: string) => {
  const queryString =
    (process.env.ASKME_API as string) +
    "?" +
    new URLSearchParams({
      domain: corpus,
      question: query,
      "title-checkbox-1": "1.0",
      "title-weight-1": "1.0",
      "title-checkbox-2": "1.0",
      "title-weight-2": "1.0",
      "title-checkbox-3": "1.0",
      "title-weight-3": "1.0",
      "title-checkbox-4": "1.0",
      "title-weight-4": "1.0",
      "title-checkbox-5": "1.0",
      "title-weight-5": "1.0",
      "title-checkbox-6": "1.0",
      "title-weight-6": "1.0",
      "title-checkbox-7": "1.0",
      "title-weight-7": "1.0",
      "title-weight-x": "0.9",
      "abstract-checkbox-1": "1.0",
      "abstract-weight-1": "1.0",
      "abstract-checkbox-2": "1.0",
      "abstract-weight-2": "1.0",
      "abstract-checkbox-3": "1.0",
      "abstract-weight-3": "1.0",
      "abstract-checkbox-4": "1.0",
      "abstract-weight-4": "1.0",
      "abstract-checkbox-5": "1.0",
      "abstract-weight-5": "1.0",
      "abstract-checkbox-6": "1.0",
      "abstract-weight-6": "1.0",
      "abstract-checkbox-7": "1.0",
      "abstract-weight-7": "1.0",
      "abstract-weight-x": "1.1",
    });

  return queryString;
};
