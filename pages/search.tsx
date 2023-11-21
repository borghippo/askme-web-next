import SearchResultsCards from "@/components/SearchResultsCards";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { AskMeResultData } from "@/types";
import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const fetcher: Fetcher<AskMeResultData, string> = (q) =>
  fetch(q).then((res) => res.json());

export default function Search({
  queryProp,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [query, setQuery] = useState(queryProp);

  const { data } = useSWR(`/api/results?q=${queryProp}`, fetcher, {
    revalidateOnFocus: false,
  });

  const fetchNewQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      router.push({
        pathname: "/search",
        query: {
          q: query,
        },
      });
    }
  };

  return (
    <div>
      <Header query={query} setQuery={setQuery} fetchNewQuery={fetchNewQuery} />

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
