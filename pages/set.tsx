import Loading from "@/components/Loading";
import { AskMeSet } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<AskMeSet, string> = (q) =>
  fetch(q).then((res) => res.json());

export default function Doc() {
  const router = useRouter();
  const { ids } = router.query;

  const { data: set } = useSWR(ids ? `/api/set?ids=${ids}` : null, fetcher, {
    revalidateOnFocus: false,
  });

  if (!set) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center">
      <article className="prose">
        <h2>{`Terms for ${set.documents.length} documents`}</h2>
        <ul>
          {set.documents.map((document, i) => {
            return <li key={i}>{document.title}</li>;
          })}
        </ul>
        <table>
          {/* head */}
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
