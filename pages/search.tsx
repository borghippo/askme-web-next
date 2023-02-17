import SearchResultsCards from "@/components/SearchResultsCards";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { getQueryString } from "@/utils/getQueryString";
import Head from "next/head";
import Loading from "@/components/Loading";
import { AskMeResultData } from "@/interfaces";
import NoResults from "@/components/NoResults";

export default function Search({
  c: corpusProp,
  q: queryProp,
  r: resultsProp,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [router.query]);

  const fetchResults = async (
    e: React.FormEvent<HTMLFormElement>,
    corpus: string,
    query: string
  ) => {
    e.preventDefault();
    if (query && router && !loading) {
      setLoading(true);
      router.push({
        pathname: "/search",
        query: {
          c: corpus,
          q: query,
        },
      });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{queryProp}</title>
        <meta name="description" content="askme anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header
          corpusProp={corpusProp}
          queryProp={queryProp}
          fetchResults={fetchResults}
        />
        {!loading ? (
          resultsProp.length > 1 ? (
            <SearchResultsCards results={resultsProp} />
          ) : (
            <NoResults />
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirectToHome = {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };

  const params = context.query;
  const { c, q } = params;

  if (!c || !q) {
    return redirectToHome;
  }

  const queryString = getQueryString(c as string, q as string);
  const res = await fetch(queryString, {
    method: "POST",
  });
  const data: AskMeResultData = await res.json();
  if (data.documents) {
    const r = data.documents;
    return { props: { c, q, r } };
  }
  return redirectToHome;
};
