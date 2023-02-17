import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  corpusProp: string;
  queryProp: string;
  fetchResults: (
    e: React.FormEvent<HTMLFormElement>,
    corpus: string,
    query: string
  ) => void;
}

export default function Header({
  corpusProp,
  queryProp,
  fetchResults,
}: HeaderProps) {
  const [corpus, setCorpus] = useState(corpusProp);
  const [query, setQuery] = useState(queryProp);
  const { theme, setTheme } = useTheme();

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

  return (
    <header className="sticky top-0 border-b bg-base-100">
      <div className="flex w-full flex-col items-center p-4 max-sm:space-y-2 sm:flex-row">
        <Link className="shrink-0" href={"/"}>
          <h1
            className={`text-4xl font-extrabold max-sm:mb-2 sm:text-3xl  ${
              theme == "dark"
                ? "bg-gradient-to-br from-cyan-500 to-blue-500 bg-clip-text text-transparent"
                : "text-blue-800"
            } text-center`}
          >
            AskMe Search
          </h1>
        </Link>
        <form
          onSubmit={(e) => fetchResults(e, corpus, query)}
          className="input-group-sm input-group max-w-md sm:mr-2 sm:ml-4"
        >
          <input
            type="text"
            value={query}
            placeholder="Search…"
            onChange={(e) => handleQueryChange(e)}
            className="input-bordered input input-sm w-full flex-grow"
          />
          <button type="submit" className="btn-square btn-sm btn">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
        <select
          value={corpus}
          onChange={(e) => handleCorpusChange(e)}
          className="select-bordered select select-sm max-w-md max-sm:w-full sm:mr-4"
        >
          <option value={"nfcorpus"}>NFCorpus</option>
          <option value={"scifact"}>SciFact</option>
        </select>
        <label className="swap swap-rotate max-sm:hidden sm:ml-auto">
          <input
            type="checkbox"
            checked={true ? theme == "dark" : false}
            onChange={() => changeTheme()}
          />
          <SunIcon className="swap-on h-6 w-6" />
          <MoonIcon className="swap-off h-6 w-6" />
        </label>
      </div>
    </header>
  );
}
