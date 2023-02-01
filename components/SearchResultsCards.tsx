import { ElasticResult } from "@/interfaces";

interface SearchResultProps {
  results: ElasticResult[];
}

export default function SearchResultsCards({ results }: SearchResultProps) {
  return (
    <div className="mx-auto w-full px-3 lg:pl-60">
      <p className="mb-5 mt-3 text-sm">50 results returned</p>
      {Object.values(results).map((result) => {
        return (
          <div key={result._id} className="max-w-xl mb-6">
            <div className="group">
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                https://example.fake
              </a>
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="truncate text-xl text-primary group-hover:underline">
                  {result._source.title}
                </h2>
              </a>
            </div>
            <p className="line-clamp-2 text-sm">{result._source.txt}</p>
          </div>
        );
      })}
    </div>
  );
}
