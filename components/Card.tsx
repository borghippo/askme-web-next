import { AskMeDocumentMultiple } from "@/types";
import {
  BeakerIcon,
  DocumentIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface CardProps {
  result: AskMeDocumentMultiple;
  index: number;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function Card({
  result,
  index,
  checked,
  setChecked,
}: CardProps) {
  const handleCheck = () => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !prev[index];
      return newChecked;
    });
  };

  //TODO: fix bug with some result lines not clamping
  return (
    <div className="mb-6 flex max-w-xl flex-row gap-x-4">
      <label className="mt-1 hover:cursor-pointer">
        <input
          type="checkbox"
          checked={!!checked}
          onChange={handleCheck}
          className="checkbox"
        />
      </label>
      <div className="flex flex-col">
        <div className="group">
          <div className="flex gap-x-2">
            <a href={result.url} className="line-clamp-1 text-sm">
              {result.url}
            </a>
            {/* <div className="flex items-center gap-x-1">
              <TrophyIcon className="h-4 w-4" />
              <p className="text-sm font-medium">{result.nscore?.toFixed(2)}</p>
            </div> */}
          </div>
          <a href={result.url}>
            <h2 className="line-clamp-2 text-lg font-medium text-primary group-hover:underline">
              {result.title}
            </h2>
          </a>
        </div>
        {/* <p className="text-sm text-secondary">J Doe, M Smith, T Davis</p> */}
        <p className="line-clamp-3 text-sm">{result.summary}</p>
        <div className="mt-1 flex gap-x-2 text-primary">
          <Link
            href={`/doc/${result.identifier}`}
            className="group flex items-center gap-x-1 hover:cursor-pointer"
          >
            <DocumentIcon className="h-4 w-4" />
            <p className="text-sm font-medium group-hover:underline">
              Document Summary
            </p>
          </Link>
          {/* <div className="group flex items-center gap-x-1 hover:cursor-pointer">
            <BeakerIcon className="h-4 w-4" />
            <a className="text-sm font-medium group-hover:underline">
              Entity Summary
            </a>
          </div> */}
          {/* <div className="flex items-center gap-x-1">
            <TrophyIcon className="h-4 w-4" />
            <p className="text-sm font-medium">{result.nscore?.toFixed(2)}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
