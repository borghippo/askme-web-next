import { AskMeDocument } from "@/types";
import { CogIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Card from "./Card";
import NoResults from "./NoResults";

interface SearchResultProps {
  results: AskMeDocument[];
  corpus: string;
}

export default function SearchResultsCards({
  results,
  corpus,
}: SearchResultProps) {
  const [checked, setChecked] = useState<boolean[]>([]);
  const numChecked = checked.filter(Boolean).length;

  useEffect(() => {
    if (results) {
      setChecked(new Array(results.length).fill(false));
    }
  }, [results]);

  if (results.length == 0) {
    return (
      <div className="mx-auto w-full px-3 md:pl-32 lg:pl-60">
        <NoResults />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-3 md:pl-32 lg:pl-60">
      <div className="mb-5 mt-3 flex flex-col gap-y-2">
        <p className="text-sm font-medium">{results.length} results returned</p>
        <div>
          {numChecked > 0 && (
            <button className="btn btn-sm">
              <p>
                {`Process ${
                  numChecked == 1 ? "Document" : `${numChecked} Documents`
                }`}
              </p>
              <CogIcon className="h-6 w-6" />
            </button>
          )}
        </div>
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
          />
        );
      })}
    </div>
  );
}
