import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { domains } from "@/config/domains";

interface HeroProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, query: string) => void;
  loading: boolean;
}

export default function Hero({ handleSubmit, loading }: HeroProps) {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="hero min-h-screen w-full">
      <div className="hero-content flex-col lg:flex-row">
        <div className="max-w-md space-y-2">
          <h1 className="text-center text-5xl font-bold text-primary">
            AskMe Search
          </h1>
          <p className="py-6 text-center">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <form
            onSubmit={(e) => handleSubmit(e, query)}
            className="input-group"
          >
            <input
              type="text"
              placeholder="Search…"
              onChange={(e) => handleQueryChange(e)}
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-square">
              {!loading ? (
                <MagnifyingGlassIcon className="h-6 w-6" />
              ) : (
                <div className="loading loading-spinner"></div>
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="custom-shape-divider-bottom">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}
