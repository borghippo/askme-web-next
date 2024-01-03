import Loading from "@/components/Loading";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/ErrorMessage";
import { AskMeError, AskMeSet } from "@/types";
import { useSettingsStore } from "@/store/settingsStore";
import Link from "next/link";


const fetcher: Fetcher<AskMeSet, string> = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const { message, stack, details } = await res.json();
    const status = res.status;
    const error: AskMeError = { message, status, stack, details };
    throw error;
  }

  return res.json();
};

export default function Doc() {
  const settings = useSettingsStore();
  const router = useRouter();
  const { ids } = router.query;

  const { data: set, error } = useSWR(
    ids ? `/api/set?ids=${ids}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  if (error) {
    return <ErrorMessage status={error.status} message={error.message}
                         stack={error.stack} details={error.details}/>;
  }

  if (!set) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-6 flex justify-center px-3">
        <article className="prose max-w-4xl">
          <h2>{"Documents selected:"}</h2>
          <ol>
            {set.documents.map((document, i) => {
              return (
                <li key={i}>
                  <Link href={`/doc/${document.identifier}`}>
                    {document.title}
                  </Link>
                </li>
              );
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
                {set.terms.slice(0,50).map((term, i) => {
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
            <div className="flex flex-wrap justify-left gap-4 ml-4 leading-5 pb-2">
              {set.terms.slice(0,50).map((term, i) => {
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
