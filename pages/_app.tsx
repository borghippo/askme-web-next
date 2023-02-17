import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  // wait for client to mount for themeing
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  return (
    <ThemeProvider defaultTheme="light">
      {isMounted && <Component key={router.asPath} {...pageProps} />}
    </ThemeProvider>
  );
}
