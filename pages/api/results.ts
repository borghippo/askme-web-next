import { AskMeResultData } from "@/types";
import { getResultsQueryString } from "@/utils/getQueryString";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AskMeResultData>,
) {
  const { q } = req.query;
  const results = await fetch(getResultsQueryString(q as string), {
    method: "POST",
  });
  const documents = await results.json();
  res.status(200).json(documents);
}
