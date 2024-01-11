import { useRouter } from "next/router";
import { useState } from "react";
import Hero from "@/components/Hero";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    query: string,
    domains: string,
  ) => {
    e.preventDefault();
    if (query && router && !loading) {
      setLoading(true);
      router.push({
        pathname: "/search",
        query: {
          q: query,
          ...(domains && { domains: domains }),
        },
      });
    }
  };

  return <Hero handleSubmit={handleSubmit} loading={loading} />;
}
