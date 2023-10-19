export const getQueryString = (corpus: string, query: string) => {
  const queryString =
    (process.env.ASKME_API as string) +
    "/question?" +
    new URLSearchParams({
      domain: corpus,
      question: query,
    });

  return queryString;
};
