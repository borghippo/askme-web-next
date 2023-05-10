import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

  const handleCorpusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCorpus(e.target.value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 border-b bg-base-100">
      <div className="flex w-full flex-col items-center p-4 max-sm:space-y-2 sm:flex-row">
        <Link className="shrink-0" href={"/"}>
          <h1 className="text-4xl font-bold text-primary max-sm:mb-2 sm:text-3xl">
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
      </div>
    </header>
  );
}
