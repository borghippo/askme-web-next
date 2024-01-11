import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { AskMeDocumentSingle, AskMeError } from "@/types";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import Term from "@/components/Term";
import { useSettingsStore } from "@/store/settingsStore";


const fetcher: Fetcher<AskMeDocumentSingle, string> = async (url) => {
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
  const { id } = router.query;

  const { data: document, error } = useSWR(
    id ? `/api/doc/${id}` : null, fetcher, { revalidateOnFocus: false } );

  if (error) {
    console.log('error:', error)
    return <ErrorMessage status={error.status} message={error.message}
                         stack={error.stack} details={error.details}/>;
  }

  if (!document) {
    return <Loading />;
  }

  return (
    <>
    <Head>
      <title>AskMe document</title>
    </Head>
    <div>
      <div className="mt-6 flex justify-center px-3">
        <article className="prose prose-h2:mt-8 max-w-4xl">
          <h1 className="mb-0 text-3xl">{document.title}</h1>
          <a href={document.url} target="_blank" className="line-clamp-1">
            {document.url}
          </a>
          <p className="text-sm">
            {document.authors.join(", ")} - {document.year}
          </p>
          <h2 className="text-xl">Summary</h2>
          <p className="line-clamp-6">{document.summary}</p>
          <h2 className="text-xl">Terms</h2>
          {settings.devMode ? (
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
                { /* the Term needs a unique key because it's a list */ }
                {document.terms.slice(0,25).map((term, i) => {
                  return (<Term key={i} index={i} term={term} asRow={true}/>);
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-wrap justify-left leading-5 gap-4 pb-2">
              {document.terms.slice(0,settings.termsPerDocument).map((term, i) => {
                return (<Term key={i} index={i} term={term} asRow={false}/>);
              })}
            </div>
          )}
        </article>
      </div>
    </div>
    </>
  );

}
