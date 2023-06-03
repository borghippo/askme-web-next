export const getQueryString = (corpus: string, query: string) => {
  const queryString =
    (process.env.ASKME_API as string) +
    "/question?" +
    new URLSearchParams({
      domain: corpus,
      question: query,
      "title-checkbox-1": "1",
      "title-weight-1": "1.0",
      "title-checkbox-2": "2",
      "title-weight-2": "1.0",
      "title-checkbox-3": "3",
      "title-weight-3": "1.0",
      "title-checkbox-4": "4",
      "title-weight-4": "1.0",
      "title-checkbox-5": "5",
      "title-weight-5": "1.0",
      "title-checkbox-6": "6",
      "title-weight-6": "1.0",
      "title-checkbox-7": "7",
      "title-weight-7": "1.0",
      "title-weight-x": "0.9",
      "abstract-checkbox-1": "1",
      "abstract-weight-1": "1.0",
      "abstract-checkbox-2": "2",
      "abstract-weight-2": "1.0",
      "abstract-checkbox-3": "3",
      "abstract-weight-3": "1.0",
      "abstract-checkbox-4": "4",
      "abstract-weight-4": "1.0",
      "abstract-checkbox-5": "5",
      "abstract-weight-5": "1.0",
      "abstract-checkbox-6": "6",
      "abstract-weight-6": "1.0",
      "abstract-checkbox-7": "7",
      "abstract-weight-7": "1.0",
      "abstract-weight-x": "1.1",
    });

  return queryString;
};
