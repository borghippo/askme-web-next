import { ElasticResult } from "@/interfaces";
import { DocumentIcon, BeakerIcon } from "@heroicons/react/24/outline";

interface SearchResultProps {
  results: ElasticResult[];
}

export default function SearchResultsCards({ results }: SearchResultProps) {
  return (
    <div className="mx-auto w-full px-3 lg:pl-60">
      <p className="mb-5 mt-3 text-sm">{results.length} results returned</p>
      {Object.values(results).map((result) => {
        return (
          <div key={result._id} className="max-w-xl mb-6">
            <div className="group">
              <a
                href="https://www.brandeis.edu/"
                // target="_blank"
                // rel="noopener noreferrer"
                className="text-sm"
              >
                https://example.fake
              </a>
              <a
                href="https://www.brandeis.edu/"
                // target="_blank"
                // rel="noopener noreferrer"
              >
                <h2 className="truncate text-xl text-primary group-hover:underline">
                  {result._source.title}
                </h2>
              </a>
            </div>
            <p className="line-clamp-2 text-sm">{result._source.txt}</p>
            <div className="flex gap-x-2 mt-1 text-primary font-light">
              <div className="flex items-center gap-x-1 group">
                <DocumentIcon className="w-4 h-4" />
                <a href="" className="text-sm group-hover:underline">
                  Related Documents
                </a>
              </div>
              <div className="flex items-center gap-x-1 group">
                <BeakerIcon className="w-4 h-4" />
                <a href="" className="text-sm group-hover:underline">
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
