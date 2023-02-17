import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  // wait until client mounted to use theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (
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

  // wait until mounted to use theme
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>AskMe Search</title>
        <meta name="description" content="askme anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero handleSubmit={handleSubmit} loading={loading} />
    </>
  );
}
