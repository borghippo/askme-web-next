import { domains } from "@/config/domains";
import { useSettingsStore } from "@/store/settingsStore";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const settings = useSettingsStore();
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
              onSubmit={(e) => {
                fetchNewQuery(e, filteredDomainsToString());
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
              <label
                htmlFor="settings-drawer"
                className="btn btn-square join-item drawer-button btn-sm"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
              </label>
            </form>
          </div>
        </header>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="settings-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <li>
            <h2 className="menu-title">Domain Filters</h2>
            <ul>
              {domains.map((domain, i) => {
                return (
                  <li key={i}>
                    <label className="label justify-start gap-x-4">
                      <input
                        type="checkbox"
                        checked={!!settings.domains[i].enabled}
                        onChange={() => settings.toggleDomain(i)}
                        className="checkbox checkbox-sm"
                      />
                      <span className="label-text">{domain}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <h2 className="menu-title">Display Settings</h2>
            <ul>
              <li>
                <label className="label justify-start gap-x-4">
                  <input
                    type="checkbox"
                    checked={!!settings.devMode}
                    onChange={() => settings.toggleDevMode()}
                    className="checkbox checkbox-sm"
                  />
                  <span className="label-text">Developer Mode</span>
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
