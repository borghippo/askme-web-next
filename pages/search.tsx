import SearchResultsCards from "@/components/SearchResultsCards";
import Loading from "@/components/Loading";
import { AskMeResultData } from "@/types";
import useSWR, { Fetcher } from "swr";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const fetcher: Fetcher<AskMeResultData, string> = (q) =>
  fetch(q).then((res) => res.json());

export default function Search({
  queryProp,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSWR(`/api/results?q=${queryProp}`, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      {data ? <SearchResultsCards results={data.documents} /> : <Loading />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const params = context.query;
  const { q } = params;

  const queryProp = q as string;

  return { props: { queryProp } };
}) satisfies GetServerSideProps<{
  queryProp: string;
}>;
