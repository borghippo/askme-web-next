import Loading from "@/components/Loading";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/ErrorMessage";
import { AskMeError, AskMeResultData } from "@/types";
import SearchResultsCards from "@/components/SearchResultsCards";
import { fetcher } from "@/utils/fetcher";

// using the import is problematic because it does not use AskeMeResultData
// but AskeMeSet, th eonly reason it works in because type checking is not
// happening

/*
const fetcher: Fetcher<AskMeResultData, string> = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const { message, stack, details } = await res.json();
    const status = res.status;
    const error: AskMeError = { message, status, stack, details };
    throw error;
  }
  return res.json();
};
*/

export default function Search()
{
  const router = useRouter();
  const { q, domains, type } = router.query;
  const typeString = type ? `&type=${type}` : "";
  const domainsString = domains ? `&domains=${domains}` : "";

  const { data, error } = useSWR(
    q ? `/api/results?q=${q}${domainsString}${typeString}` : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  if (error) {
    return <ErrorMessage status={error.status} message={error.message}
                         stack={error.stack} details={error.details}/>;
  }

  return (
    <div>
      {data ? <SearchResultsCards results={data.documents} /> : <Loading />}
    </div>
  );
}
