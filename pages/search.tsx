import SearchResultsCards from "@/components/SearchResultsCards";
import Loading from "@/components/Loading";
import { AskMeResultData } from "@/types";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

const fetcher: Fetcher<AskMeResultData, string> = (q) =>
  fetch(q).then((res) => res.json());

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const { data } = useSWR(q ? `/api/results?q=${q}` : null, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      {data ? <SearchResultsCards results={data.documents} /> : <Loading />}
    </div>
  );
}
