import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useState } from "react";
import Spinner from "./Spinner";

interface HeroProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    corpus: string,
    query: string
  ) => void;
  loading: boolean;
}

export default function Hero({ handleSubmit, loading }: HeroProps) {
  const [query, setQuery] = useState("");
  const [corpus, setCorpus] = useState("nfcorpus");
  const { theme, setTheme } = useTheme();

  const handleCorpusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCorpus(e.target.value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="hero min-h-screen items-start">
      <div className="hero-content text-center">
        <div className="max-w-md space-y-2">
          <h1
            className={`text-5xl font-extrabold  ${
              theme == "dark"
                ? "bg-gradient-to-br from-cyan-500 to-blue-500 bg-clip-text text-transparent"
                : "text-blue-800"
            } py-6 text-center`}
          >
            AskMe Search
          </h1>
          <form
            onSubmit={(e) => handleSubmit(e, corpus, query)}
            className="input-group"
          >
            <input
              type="text"
              placeholder="Search…"
              onChange={(e) => handleQueryChange(e)}
              className="input-bordered input w-full"
            />
            <button type="submit" className="btn-square btn">
              {!loading ? (
                <MagnifyingGlassIcon className="h-6 w-6" />
              ) : (
                <Spinner />
              )}
            </button>
          </form>
          <select
            value={corpus}
            onChange={(e) => handleCorpusChange(e)}
            className="select-bordered select w-full"
          >
            <option value={"nfcorpus"}>NFCorpus</option>
            <option value={"scifact"}>SciFact</option>
          </select>
        </div>
      </div>
    </div>
  );
}
