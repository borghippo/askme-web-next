import SearchResultsCards from "@/components/SearchResultsCards";
import { ElasticResult, ElasticResultData } from "@/interfaces";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  SunIcon,
  MoonIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// TODO consolidate dupe code for fetching, etc
export default function Search({
  c: corpusProp,
  q: queryProp,
  r: resultsProp,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [query, setQuery] = useState(queryProp);
  const [corpus, setCorpus] = useState(corpusProp);
  const [results, setResults] = useState<ElasticResult[]>(resultsProp);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // wait until mounted so we can check what the theme is
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      try {
        const res = await fetch("http://localhost:8000/search", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query, corpus: corpus }),
        });
        if (!res.ok) {
          console.log("api error");
        } else {
          const data: ElasticResultData = await res.json();
          setResults(data.answer);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCorpusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCorpus(e.target.value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // add a spinner while loading
  if (!mounted) {
    return null;
  }

  return (
    <div>
      <header className="sticky top-0 bg-base-100 border-b">
        <div className="flex flex-col sm:flex-row items-center max-sm:space-y-2 w-full p-4">
          <Link className="shrink-0" href={"/"}>
            <h1
              className={`text-4xl sm:text-3xl font-extrabold max-sm:mb-2  ${
                theme == "dark"
                  ? "text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-500"
                  : "text-blue-800"
              } text-center`}
            >
              AskMe Search
            </h1>
          </Link>
          <form
            onSubmit={(e) => fetchResults(e)}
            className="input-group input-group-sm max-w-md sm:mr-2 sm:ml-4"
          >
            <input
              type="text"
              value={query}
              placeholder="Search…"
              onChange={(e) => handleQueryChange(e)}
              className="input input-sm input-bordered flex-grow w-full"
            />
            <button type="submit" className="btn btn-sm btn-square">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
          </form>
          <select
            value={corpus}
            onChange={(e) => handleCorpusChange(e)}
            className="select select-sm select-bordered max-sm:w-full max-w-md sm:mr-4"
          >
            <option value={"nfcorpus"}>NFCorpus</option>
            <option value={"scifact"}>SciFact</option>
          </select>
          <label className="swap swap-rotate sm:ml-auto max-sm:hidden">
            <input
              type="checkbox"
              checked={true ? theme == "dark" : false}
              onChange={() => changeTheme()}
            />
            <SunIcon className="swap-on w-6 h-6" />
            <MoonIcon className="swap-off w-6 h-6" />
          </label>
        </div>
      </header>
      {results.length > 0 && <SearchResultsCards results={results} />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  //TODO error handling for api call
  try {
    const res = await fetch("http://127.0.0.1:8000/search/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: q, corpus: c }),
    });
    if (!res.ok) {
      console.log("api error");
    } else {
      const data: ElasticResultData = await res.json();
      const r = data.answer;
      return { props: { c, q, r } };
    }
  } catch (err) {
    console.log(err);
  }

  return { props: { c, q } };
};
