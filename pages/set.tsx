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
    <div className="min-h-screen flex flex-col gap-y-4 p-6">
      <h1 className="font-bold text-3xl">
        {`Terms for ${set.documents.length} documents`}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
      </div>
    </div>
  );
}
