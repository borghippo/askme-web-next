import Loading from "@/components/Loading";
import { useSettingsStore } from "@/store/settingsStore";
import { AskMeSet } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<AskMeSet, string> = (q) =>
  fetch(q).then((res) => res.json());

export default function Doc() {
  const settings = useSettingsStore();
  const router = useRouter();
  const { ids } = router.query;

  const { data: set } = useSWR(ids ? `/api/set?ids=${ids}` : null, fetcher, {
    revalidateOnFocus: false,
  });

  if (!set) {
    return <Loading />;
  }
  return (
    <div>
      <div className="mt-6 flex justify-center px-3">
        <article className="prose">
          <h2>{"Documents selected:"}</h2>
          <ol>
            {set.documents.map((document, i) => {
              return <li key={i}>{document.title}</li>;
            })}
          </ol>
          <h2>Terms</h2>
          {settings.devMode ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>TF-IDF</th>
                  <th>Count</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {set.terms.map((term, i) => {
                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{term[0]}</td>
                      <td>{term[1]}</td>
                      <td>
                        <Link
                          className="link link-primary"
                          href={`/search?q=${term[2]}&type=exact`}
                        >
                          {term[2]}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 pb-2">
              {set.terms.map((term, i) => {
                return (
                  <div key={i}>
                    <Link
                      className="link link-primary"
                      href={`/search?q=${term[2]}&type=exact`}
                    >
                      {term[2]}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
