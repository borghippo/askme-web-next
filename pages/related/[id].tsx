import SearchResultsCards from "@/components/SearchResultsCards";
import Loading from "@/components/Loading";
import { AskMeError, AskMeRelatedData } from "@/types";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/ErrorMessage";

const fetcher: Fetcher<AskMeRelatedData, string> = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const { detail } = await res.json();
    const status = res.status;
    const error: AskMeError = { detail, status };
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
    return <ErrorMessage status={error.status} detail={error.detail} />;
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
