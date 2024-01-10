// Generating the query strings that are sent off to the AskMe API.

export const getResultsQueryString = (
  query: string,
  domains: string | undefined,
  type: string | undefined,
) => {
  const typeString = type ? `&type=${type}` : "";
  const domainsString = domains ? `&domains=${domains}` : "";
  const queryString =
    (process.env.ASKME_API as string) +
    `/api/question?query=${query}${domainsString}${typeString}`;
  return queryString;
};

export const getRelatedQueryString = (id: string) => {
  return (process.env.ASKME_API as string) + `/api/related/${id}`;
};

export const getDocQueryString = (id: string) => {
  return (process.env.ASKME_API as string) + `/api/doc/${id}`;
};

export const getSetQueryString = (ids: string) => {
  return (process.env.ASKME_API as string) + `/api/set/?ids=${ids}`;
};
