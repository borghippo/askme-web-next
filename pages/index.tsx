import { useTheme } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// TODO add support for logo change on theme change (will have to wait for mount like in search page)
// or could make a logo for "AskMe Search" instead of text
export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [corpus, setCorpus] = useState("scifact");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // wait until mounted so we can check what the theme is
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCorpusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCorpus(e.target.value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      router.push({
        pathname: "/search",
        query: {
          c: corpus,
          q: query,
        },
      });
    }
  };

  // add a spinner while loading
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>AskMe</title>
        <meta name="description" content="askme anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero min-h-screen items-start">
        <div className="hero-content text-center">
          <div className="max-w-md space-y-2">
            <h1
              className={`text-5xl font-extrabold  ${
                theme == "dark"
                  ? "text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-500"
                  : "text-red-700"
              } text-center py-6`}
            >
              AskMe Search
            </h1>
            <form onSubmit={(e) => handleSubmit(e)} className="input-group">
              <input
                type="text"
                placeholder="Search…"
                onChange={(e) => handleQueryChange(e)}
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-square">
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            </form>
            <select
              value={corpus}
              onChange={(e) => handleCorpusChange(e)}
              className="select select-bordered w-full"
            >
              <option value={"scifact"}>SciFact</option>
              <option value={"nfcorpus"}>NFCorpus</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
