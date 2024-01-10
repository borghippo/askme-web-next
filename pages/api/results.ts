import { AskMeResultData } from "@/types";
import { getResultsQueryString } from "@/utils/getQueryString";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AskMeResultData>,
) {
  const { q, domains, type } = req.query;
  const results = await fetch(
    getResultsQueryString(
      q as string,
      domains as string | undefined,
      type as string | undefined,
    ),
    {
      method: "POST",
    },
  );
  const documents = await results.json();
  res.status(results.status).json(documents);
}
