import { AskMeDocument, DisplayMode } from "@/types";
import { CogIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Card from "./Card";
import NoResults from "./NoResults";

interface SearchResultProps {
  results: AskMeDocument[];
  corpus: string;
  fetchRelated: (e: any, corpus: string, query: string) => void;
  displayMode: DisplayMode;
  setDisplayMode: React.Dispatch<React.SetStateAction<DisplayMode>>;
  backToResults: () => void;
}

export default function SearchResultsCards({
  results,
  corpus,
  fetchRelated,
  displayMode,
  setDisplayMode,
  backToResults,
}: SearchResultProps) {
  const [checked, setChecked] = useState<boolean[]>([]);
  const [processPressed, setProcessPressed] = useState(false);
  const numChecked = checked.filter(Boolean).length;

  useEffect(() => {
    if (results) {
      setChecked(new Array(results.length).fill(false));
    }
  }, [results]);

  if (!results || results.length <= 1) {
    return (
      <div className="mx-auto w-full px-3 md:pl-32 lg:pl-60">
        {displayMode != DisplayMode.Normal && (
          <button
            onClick={() => backToResults()}
            className="btn-sm btn mt-3 w-40"
          >
            back to results
          </button>
        )}
        <NoResults />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-3 md:pl-32 lg:pl-60">
      <div className="mb-5 mt-3 flex flex-col gap-y-2">
        {displayMode == DisplayMode.Normal ? (
          <p className="text-sm font-medium">
            {results.length} results returned
          </p>
        ) : (
          <button onClick={() => backToResults()} className="btn-sm btn w-40">
            back to results
          </button>
        )}
        {numChecked > 0 && (
          <div className="flex items-center gap-x-2 text-secondary">
            <div className="btn-secondary btn-sm btn gap-2">
              {`Process ${
                numChecked == 1 ? "Document" : `${numChecked} Documents`
              }`}
              <CogIcon className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>
      {results.map((result, i) => {
        return (
          <Card
            key={i}
            result={result}
            corpus={corpus}
            index={i}
            checked={checked[i]}
            setChecked={setChecked}
            fetchRelated={fetchRelated}
          />
        );
      })}
    </div>
  );
}
