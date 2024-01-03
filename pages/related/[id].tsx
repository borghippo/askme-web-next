import Loading from "@/components/Loading";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/ErrorMessage";
import { AskMeError, AskMeRelatedData } from "@/types";
import SearchResultsCards from "@/components/SearchResultsCards";

const fetcher: Fetcher<AskMeRelatedData, string> = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const { message, stack, details } = await res.json();
    const status = res.status;
    const error: AskMeError = { message, status, stack, details };
    throw error;
  }

  return res.json();
};

export default function Related() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(id ? `/api/related/${id}` : null, fetcher, {
    revalidateOnFocus: false,
  });

  if (error) {
    return <ErrorMessage status={error.status} message={error.message}
                         stack={error.stack} details={error.details}/>;
   }

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
