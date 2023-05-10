import { AskMeDocument } from "@/types";
import {
  BeakerIcon,
  DocumentIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

interface CardProps {
  result: AskMeDocument;
  corpus: string;
  index: number;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  fetchRelated: (e: any, corpus: string, query: string) => void;
}

export default function Card({
  result,
  corpus,
  index,
  checked,
  setChecked,
  fetchRelated,
}: CardProps) {
  const handleCheck = () => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !prev[index];
      return newChecked;
    });
  };

  return (
    <div className="mb-6 flex max-w-xl flex-row gap-x-4">
      <label className="mt-1 flex flex-col items-center gap-y-2 text-sm hover:cursor-pointer">
        <input
          type="checkbox"
          checked={!!checked}
          onChange={handleCheck}
          className="checkbox"
        />
        {index + 1}
      </label>
      <div className="flex flex-col">
        <div className="group">
          <div className="flex gap-x-2">
            <a href={result.url} className="text-sm line-clamp-1">
              {result.url}
            </a>
            {/* <div className="flex items-center gap-x-1">
              <TrophyIcon className="h-4 w-4" />
              <p className="text-sm font-medium">{result.nscore?.toFixed(2)}</p>
            </div> */}
          </div>
          <a href={result.url}>
            <h2 className="text-lg font-medium text-primary line-clamp-2 group-hover:underline">
              {result.title?.text}
            </h2>
          </a>
        </div>
        {/* <p className="text-sm text-secondary">J Doe, M Smith, T Davis</p> */}
        <p className="text-sm line-clamp-3">{result.articleAbstract?.text}</p>
        <div className="mt-1 flex gap-x-2 text-primary">
          <div
            onClick={(e) =>
              fetchRelated(e, corpus, result.articleAbstract!.text)
            }
            className="group flex items-center gap-x-1 hover:cursor-pointer"
          >
            <DocumentIcon className="h-4 w-4" />
            <a className="text-sm font-medium group-hover:underline">
              Related Documents
            </a>
          </div>
          <div className="group flex items-center gap-x-1 hover:cursor-pointer">
            <BeakerIcon className="h-4 w-4" />
            <a className="text-sm font-medium group-hover:underline">
              Entity Summary
            </a>
          </div>
          {/* <div className="flex items-center gap-x-1">
            <TrophyIcon className="h-4 w-4" />
            <p className="text-sm font-medium">{result.nscore?.toFixed(2)}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
