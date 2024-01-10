import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

import { AskMeError, AskMeSet } from "@/types";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import Term from "@/components/Term";
import { useSettingsStore } from "@/store/settingsStore";


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


export default function Document()
{
  const settings = useSettingsStore();
  const router = useRouter();
  const { ids } = router.query;

  // useSWR returns {data: ..., error: ...}
  const { data: askmeSet, error } = useSWR(
    ids ? `/api/set?ids=${ids}` : null, fetcher, { revalidateOnFocus: false }
  );

  if (error) {
    return <ErrorMessage status={error.status} message={error.message}
                         stack={error.stack} details={error.details}/>;
  }

  if (!askmeSet) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-6 flex justify-center px-3">
        <article className="prose max-w-4xl">

          <h2>Documents selected:</h2>

          <ol>
            {askmeSet.documents.map((document, i) => {
              return (
                <li key={i}>
                  <Link href={`/doc/${document.identifier}`}>{document.title}</Link>
                </li>
              );
            })}
          </ol>

          <h2>Terms</h2>

          {settings.devMode ? (
            <div  className="pl-4">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>TF-IDF</th>
                  <th>Freq</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {askmeSet.terms.slice(0,settings.termsPerDocumentSet).map((term, i) => {
                return (<Term index={i} term={term} asRow={true}/>);
              })}
              </tbody>
            </table>
            </div>
          ) : (
            <div className="flex flex-wrap justify-left gap-4 ml-4 leading-5 pb-2">
              {askmeSet.terms.slice(0,settings.termsPerDocumentSet).map((term, i) => {
                return (<Term index={i} term={term} asRow={false}/>);
              })}
            </div>
          )}

        </article>
      </div>
    </div>
  );
}



