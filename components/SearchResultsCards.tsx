import { AskMeDocumentMultiple } from "@/types";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Card from "./Card";
import NoResults from "./NoResults";
import { useRouter } from "next/router";

interface SearchResultProps {
  results: AskMeDocumentMultiple[];
  relatedDocument?: string;
}

export default function SearchResultsCards({
  results,
  relatedDocument,
}: SearchResultProps) {
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
    <div className="mx-auto w-full px-3 md:pl-32 lg:pl-[200px]">
      <div className="mb-5 flex flex-col gap-y-2">
        {numChecked == 0 ? (
          <p className="text-sm font-medium">
            {relatedDocument
              ? `related to: ${relatedDocument}`
              : `${results.length} results returned`}
          </p>
        ) : (
          <div>
            <button onClick={() => fetchSelectedSet()} className="btn">
              <Square3Stack3DIcon className="h-6 w-6" />
              View Document Set
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
