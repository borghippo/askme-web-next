import Loading from "@/components/Loading";
import { AskMeDocumentSingle } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<AskMeDocumentSingle, string> = (q) =>
  fetch(q).then((res) => res.json());

export default function Doc() {
  const router = useRouter();
  const { id } = router.query;

  const { data: document } = useSWR(id ? `/api/doc/${id}` : null, fetcher, {
    revalidateOnFocus: false,
  });

  if (!document) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center">
      <article className="prose">
        <h1>{document.title}</h1>
        <p>
          {document.authors.join(", ")} - {document.year}
        </p>
        <h2>Summary</h2>
        <p className="line-clamp-6">{document.summary}</p>
        <h2>Terms</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Count</th>
              <th>TF-IDF</th>
            </tr>
          </thead>
          <tbody>
            {document.terms.map((term, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{term[0]}</td>
                  <td>{term[1]}</td>
                  <Link href={`/search?q=${term[2]}`}>
                    <td className="link link-primary">{term[2]}</td>
                  </Link>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    </div>
  );
}
