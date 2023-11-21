import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface HeaderProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchNewQuery: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Header({
  query,
  setQuery,
  fetchNewQuery,
}: HeaderProps) {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 border-b bg-base-100">
      <div className="flex w-full flex-col items-center p-4 max-sm:space-y-2 sm:flex-row">
        <Link className="shrink-0" href={"/"}>
          <h1 className="text-4xl font-bold text-primary max-sm:mb-2 sm:text-3xl">
            AskMe Search
          </h1>
        </Link>
        <form
          onSubmit={(e) => {
            fetchNewQuery(e);
          }}
          className="input-group input-group-sm max-w-md sm:ml-4 sm:mr-2"
        >
          <input
            type="text"
            value={query}
            placeholder="Search…"
            onChange={(e) => handleQueryChange(e)}
            className="input input-bordered input-sm w-full flex-grow"
          />
          <button type="submit" className="btn btn-square btn-sm">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
}
