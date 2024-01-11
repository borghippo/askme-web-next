import { AskMeDocumentMultiple } from "@/types";
import { getStyles } from "@/config/styles";
import { 
  DocumentDuplicateIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";


interface CardProps {
  result: AskMeDocumentMultiple;
  index: number;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
}


export default function Card({result, index, checked, setChecked}: CardProps)
{
  const styles = getStyles();

  const handleCheck = () => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !prev[index];
      return newChecked;
  })};

  return (
    <div className="mb-6 flex max-w-3xl flex-row gap-x-4">
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
            <a
              href={result.url}
              target="_blank"
              className="line-clamp-1 text-sm">
              {result.url}
            </a>
          </div>
          <a href={result.url} target="_blank">
            <h2 className={"line-clamp-2 text-lg font-medium text-primary group-hover:underline"}>
              {result.title}
            </h2>
          </a>
        </div>
        <p className="line-clamp-3 text-sm">{result.summary}</p>
        <div className="mt-1 flex gap-x-2 text-secondary">
          <Link
            href={`/doc/${result.identifier}`}
            className={styles.summaryLink}>
            <DocumentTextIcon className="h-4 w-4" />
            <p className={styles.summaryLinkName}>Document Summary</p>
          </Link>
          <Link
            href={`/related/${result.identifier}`}
            className={styles.summaryLink}>
            <DocumentDuplicateIcon className="h-4 w-4" />
            <p className={styles.summaryLinkName}>Related Documents</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
