import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.q) {
      setQuery(router.query.q as string);
    } else {
      setQuery("");
    }
  }, [router]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchNewQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      router.push(
        {
          pathname: "/search",
          query: {
            q: query,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  return (
    <header className="sticky top-0 border-b bg-base-100">
      <div className="flex w-full flex-col items-center p-4 max-sm:space-y-2 sm:flex-row">
        <Link className="shrink-0" href={"/"}>
          <p className="text-3xl font-bold text-primary max-sm:mb-2 sm:text-2xl">
            AskMe Search
          </p>
        </Link>
        <form
          onSubmit={(e) => {
            fetchNewQuery(e);
          }}
          className="join w-full max-w-sm sm:ml-4 sm:max-w-md"
        >
          <input
            type="text"
            value={query}
            placeholder="Search…"
            onChange={(e) => handleQueryChange(e)}
            className="input join-item input-bordered input-sm flex-grow"
          />
          <button type="submit" className="btn btn-square join-item btn-sm">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
}
