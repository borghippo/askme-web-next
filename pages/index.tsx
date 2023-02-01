import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>AskMe</title>
        <meta name="description" content="askme anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-500 text-center py-4">
              AskMe Search
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link href={"/search"}>
              <button className="btn">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
