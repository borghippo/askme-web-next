export const getQueryString = (domain: string, query: string) => {
  const queryString =
    (process.env.ASKME_API as string) +
    "/api/question?" +
    new URLSearchParams({
      domain,
      query,
    });

  return queryString;
};
