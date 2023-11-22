import SearchResultsCards from "@/components/SearchResultsCards";
import Loading from "@/components/Loading";
import { AskMeRelatedData } from "@/types";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

const fetcher: Fetcher<AskMeRelatedData, string> = (q) =>
  fetch(q).then((res) => res.json());

export default function Related() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id ? `/api/related/${id}` : null, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      {data ? (
        <SearchResultsCards
          results={data.documents}
          relatedDocument={data.query.doc_id}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
