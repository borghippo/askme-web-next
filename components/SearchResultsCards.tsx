import { AskMeDocument } from "@/interfaces";
import { DocumentIcon, BeakerIcon } from "@heroicons/react/24/outline";

interface SearchResultProps {
  results: AskMeDocument[];
}

export default function SearchResultsCards({ results }: SearchResultProps) {
  return (
    <div className="mx-auto w-full px-3 lg:pl-60">
      <p className="mb-5 mt-3 text-sm">{results.length} results returned</p>
      {Object.values(results).map((result, i) => {
        return (
          <div key={i} className="mb-6 max-w-xl">
            <div className="group">
              <a href={result.url} className="text-sm line-clamp-1">
                {result.url}
              </a>
              <a href={result.url}>
                <h2 className="font-semibold text-primary line-clamp-2 group-hover:underline">
                  {result.title?.text}
                </h2>
              </a>
            </div>
            <p className="text-sm line-clamp-2">
              {result.articleAbstract?.text}
            </p>
            <div className="mt-1 flex gap-x-2 font-light text-primary">
              <div className="group flex items-center gap-x-1">
                <DocumentIcon className="h-4 w-4" />
                <a className="text-sm font-medium group-hover:underline">
                  Related Documents
                </a>
              </div>
              <div className="group flex items-center gap-x-1">
                <BeakerIcon className="h-4 w-4" />
                <a className="text-sm font-medium group-hover:underline">
                  Entity Summary
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
