// Planning to import this in search.tsx and others, but need to allow for more
// types than just AskMeSet.

import { Fetcher } from "swr";
import { AskMeError, AskMeSet } from "@/types";

export const fetcher: Fetcher<AskMeSet, string> = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const { message, stack, details } = await res.json();
    const status = res.status;
    const error: AskMeError = { message, status, stack, details };
    throw error;
  }
  return res.json();
};
