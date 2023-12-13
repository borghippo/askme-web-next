export const getResultsQueryString = (
  query: string,
  type: string | undefined,
) => {
  const typeString = type ? `&type=${type}` : "";
  const queryString =
    (process.env.ASKME_API as string) +
    `/api/question?query=${query}${typeString}`;

  return queryString;
};

export const getRelatedQueryString = (id: string) => {
  const queryString = (process.env.ASKME_API as string) + `/api/related/${id}`;

  return queryString;
};

export const getDocQueryString = (id: string) => {
  const queryString = (process.env.ASKME_API as string) + `/api/doc/${id}`;

  return queryString;
};

export const getSetQueryString = (ids: string) => {
  const queryString =
    (process.env.ASKME_API as string) + `/api/set/?ids=${ids}`;

  return queryString;
};
