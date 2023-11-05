import SearchResultsCards from "@/components/SearchResultsCards";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { getQueryString } from "@/utils/getQueryString";
import Head from "next/head";
import Loading from "@/components/Loading";
import { AskMeResultData, DisplayMode } from "@/types";

export default function Search({
  corpus,
  query,
  resultData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AskMeResultData>(resultData);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    DisplayMode.Normal,
  );
  const router = useRouter();

  const fetchResults = async (e: any, newCorpus: string, newQuery: string) => {
    e.preventDefault();
    if (
      !(newQuery == query && newCorpus == corpus) &&
      newQuery &&
      router &&
      !loading
    ) {
      setLoading(true);
      router.push({
        pathname: "/search",
        query: {
          c: newCorpus,
          q: newQuery,
        },
      });
    }
  };

  // testing related documents fetching with SPA like loading until finished with backend changes so query can have its own route
  const fetchRelated = async (e: any, corpus: string, query: string) => {
    e.preventDefault();
    if (!loading && corpus && query) {
      setLoading(true);
      const requestData = { corpus: corpus, query: query };
      const res = await fetch("/api/fetchRelatedDocuments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const relatedDocuments = await res.json();
      console.log(relatedDocuments);
      setData((prev) => ({
        ...prev,
        documents: relatedDocuments,
      }));
      setDisplayMode(DisplayMode.Related);
      setLoading(false);
    }
  };

  // temp method to get back to original results by reloading route
  const backToResults = () => {
    setLoading(true);
    router.reload();
  };

  return (
    <>
      <Head>
        <title>{query}</title>
        <meta name="description" content="askme anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        corpusProp={corpus}
        queryProp={query}
        fetchResults={fetchResults}
      />
      {!loading ? (
        <SearchResultsCards
          results={data.documents}
          corpus={corpus}
          fetchRelated={fetchRelated}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          backToResults={backToResults}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const params = context.query;
  const { c, q } = params;

  if (!c || !q) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const corpus = c as string;
  const query = q as string;

  const queryString = getQueryString(c as string, q as string);
  const res = await fetch(queryString, {
    method: "POST",
  });
  const resultData: AskMeResultData = await res.json();
  return { props: { corpus, query, resultData } };
}) satisfies GetServerSideProps<{
  corpus: string;
  query: string;
  resultData: AskMeResultData;
}>;
