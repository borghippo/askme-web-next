import Loading from "@/components/Loading";
import { AskMeDocumentSingle } from "@/types";
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
    <div className="flex items-center mt-4 mx-8">
      <p className="text-xl font-semibold text-center">{document.title}</p>
    </div>
  );
}
