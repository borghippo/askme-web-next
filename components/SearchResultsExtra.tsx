import { ElasticResult } from "@/interfaces";

interface SearchResultProps {
  results: ElasticResult[];
}

export default function SearchResultsExtra({ results }: SearchResultProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table static w-full ">
        <tbody>
          {Object.values(results).map((result, i) => {
            return (
              <tr key={result._id}>
                <td>{i + 1}</td>
                <td className="whitespace-normal">
                  <a
                    href={"https://www.wikipedia.org/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover"
                  >
                    {result._source.title}
                  </a>
                </td>
                <td>{result._score.toFixed(3)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
