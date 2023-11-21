import { AskMeDocumentMultiple } from "@/types";
import { BeakerIcon, CogIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Card from "./Card";
import NoResults from "./NoResults";
import { useRouter } from "next/router";

interface SearchResultProps {
  results: AskMeDocumentMultiple[];
}

export default function SearchResultsCards({ results }: SearchResultProps) {
  const [checked, setChecked] = useState<boolean[]>([]);
  const numChecked = checked.filter(Boolean).length;
  const router = useRouter();
  useEffect(() => {
    if (results) {
      setChecked(new Array(results.length).fill(false));
    }
  }, [results]);

  const fetchSelectedSet = () => {
    const idSetString = checked
      .filter((selected) => selected == true)
      .map((selected, i) => {
        return results[i].identifier;
      });
    router.push({
      pathname: "/set",
      query: {
        ids: idSetString.toString(),
      },
    });
  };

  if (results.length == 0) {
    return <NoResults />;
  }

  return (
    <div className="mx-auto w-full px-3 md:pl-32 lg:pl-60">
      <div className="mb-5 mt-3 flex flex-col gap-y-2">
        {numChecked == 0 ? (
          <p className="text-sm font-medium">
            {results.length} results returned
          </p>
        ) : (
          <div>
            <button onClick={() => fetchSelectedSet()} className="btn">
              <BeakerIcon className="h-6 w-6" />
              {`Process ${
                numChecked == 1 ? "Document" : `${numChecked} Documents`
              }`}
            </button>
          </div>
        )}
      </div>
      {results.map((result, i) => {
        return (
          <Card
            key={i}
            result={result}
            index={i}
            checked={checked[i]}
            setChecked={setChecked}
          />
        );
      })}
    </div>
  );
}
