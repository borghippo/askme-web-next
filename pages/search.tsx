import SearchResultsCards from "@/components/SearchResultsCards";
import Loading from "@/components/Loading";
import { AskMeError, AskMeResultData } from "@/types";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/ErrorMessage";

const fetcher: Fetcher<AskMeResultData, string> = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const { detail } = await res.json();
    const status = res.status;
    const error: AskMeError = { detail, status };
    throw error;
  }

  return res.json();
};

export default function Search() {
  const router = useRouter();
  const { q, domains, type } = router.query;
  const typeString = type ? `&type=${type}` : "";
  const domainsString = domains ? `&domains=${domains}` : "";
  const { data, error } = useSWR(
    q ? `/api/results?q=${q}${domainsString}${typeString}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  if (error) {
    return <ErrorMessage status={error.status} detail={error.detail} />;
  }

  return (
    <div>
      {data ? <SearchResultsCards results={data.documents} /> : <Loading />}
    </div>
  );
}
