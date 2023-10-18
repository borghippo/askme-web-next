import { domains } from "@/config/domains";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  corpusProp: string;
  queryProp: string;
  fetchResults: (
    e: React.FormEvent<HTMLFormElement>,
    corpus: string,
    query: string,
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
          className="input-group input-group-sm max-w-md sm:ml-4 sm:mr-2"
        >
          <input
            type="text"
            value={query}
            placeholder="Search…"
            onChange={(e) => handleQueryChange(e)}
            className="input input-bordered input-sm w-full flex-grow"
          />
          <button type="submit" className="btn btn-square btn-sm">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
        <select
          value={corpus}
          onChange={(e) => handleCorpusChange(e)}
          className="select select-bordered select-sm max-w-md max-sm:w-full sm:mr-4"
        >
          {domains.map((corpus, i) => {
            return (
              <option key={i} value={corpus}>
                {corpus}
              </option>
            );
          })}
        </select>
      </div>
    </header>
  );
}
