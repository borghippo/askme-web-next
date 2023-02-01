import Moon from "@/components/Moon";
import SearchGlass from "@/components/SearchGlass";
import SearchResultsCards from "@/components/SearchResultsCards";
import Sun from "@/components/Sun";
import { ElasticResult, ElasticResultData } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [corpus, setCorpus] = useState("scifact");
  const [results, setResults] = useState<ElasticResult[]>([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.querySelector("html")!.setAttribute("data-theme", theme);
  }, [theme]);

  const fetchResults = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query, corpus: corpus }),
      });
      const data: ElasticResultData = await res.json();
      setResults(data.answer);
    } catch (err) {
      console.log(err);
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

  const askMeGrad = theme === "light"
    ? "shrink-0 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-blue-600 text-center"
    : "shrink-0 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-500 text-center";

  return (
    <div>
      <header className="sticky top-0 bg-base-100 border-b">
        <div className="flex flex-col sm:flex-row items-center max-sm:space-y-2 w-full p-4">
          <h1 className={askMeGrad}>
            AskMe Search
          </h1>

          <form
            onSubmit={(e) => fetchResults(e)}
            className="input-group input-group-sm max-w-md sm:mr-2 sm:ml-4"
          >
            <input
              type="text"
              placeholder="Search…"
              onChange={(e) => handleQueryChange(e)}
              className="input input-sm input-bordered flex-grow w-full"
            />
            <button
              type="submit"
              className="btn btn-sm btn-square"
            >
              <SearchGlass />
            </button>
          </form>
          <select
            value={corpus}
            onChange={(e) => handleCorpusChange(e)}
            className="select select-sm select-bordered max-sm:w-full max-w-md sm:mr-4"
          >
            <option value={"scifact"}>SciFact</option>
            <option value={"nfcorpus"}>NFCorpus</option>
          </select>
          <div className="flex items-center space-x-1.5 sm:ml-auto max-sm:hidden">
            {theme === "dark" ? <Moon /> : <Sun />}
            <input
              className="toggle "
              type="checkbox"
              onChange={() => changeTheme()}
              checked={theme === "dark" ? true : false}
            />
          </div>
        </div>
      </header>
      {results.length > 0 && <SearchResultsCards results={results} />}
    </div>
  );
}
