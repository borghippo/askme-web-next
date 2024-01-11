import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { domains } from "@/config/domains";
import { getStyles } from "@/config/styles";
import { useSettingsStore } from "@/store/settingsStore";
import Settings from "@/components/Settings";


export default function Header()
{
  const [query, setQuery] = useState("");
  const settings = useSettingsStore();
  const router = useRouter();
  const styles = getStyles();

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

  const filteredDomainsToString = (): string => {
    const filteredDomains: string[] = [];
    settings.domains.forEach((domain, i) => {
      if (domain.enabled) {
        filteredDomains.push(domain.name);
      }
    });
    const filteredDomainsString = filteredDomains.toString();
    return filteredDomainsString;
  };

  const fetchNewQuery = (
    e: React.FormEvent<HTMLFormElement>,
    filteredDomains: string,
  ) => {
    e.preventDefault();
    if (query) {
      router.push(
        {
          pathname: "/search",
          query: {
            q: query,
            ...(filteredDomains && { domains: filteredDomains }),
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  return (
    <div className="drawer">
      <input id="settings-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <header className="sticky top-0 border-b bg-base-100">
          <div className="flex w-full flex-col items-center p-4 max-sm:space-y-2 sm:flex-row">
            <Link className="shrink-0" href={"/"}>
              <p className="text-3xl font-bold text-primary max-sm:mb-2 sm:text-2xl">
                AskMe Search
              </p>
            </Link>
            <form
              className="join w-full max-w-sm sm:ml-4 sm:max-w-md"
              onSubmit={(e) => {fetchNewQuery(e, filteredDomainsToString()); }}>
              <input
                type="text"
                value={query}
                placeholder="Search…"
                onChange={(e) => handleQueryChange(e)}
                className="input join-item input-bordered input-sm flex-grow" />
              <button type="submit" className="btn btn-square join-item btn-sm">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <label
                htmlFor="settings-drawer"
                className="btn btn-square join-item drawer-button btn-sm">
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
              </label>
            </form>
          </div>
        </header>
      </div>
      <Settings />
    </div>
  );
}
