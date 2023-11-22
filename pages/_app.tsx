import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = router.pathname === "/" ? false : true;
  return (
    <main className={inter.className}>
      {showHeader && <Header />}
      {<Component key={router.asPath} {...pageProps} />}
    </main>
  );
}
