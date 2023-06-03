import { AskMeResultData } from "@/types";
import { getQueryString } from "@/utils/getQueryString";
import type { NextApiRequest, NextApiResponse } from "next";

// temp endpoint for testing related documents fetching
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryString = getQueryString(req.body.corpus, req.body.query);
  const documents = await fetch(queryString, {
    method: "POST",
  });
  const data: AskMeResultData = await documents.json();
  if (data.documents) {
    const docsWithoutFirst = data.documents.slice(1, 6);
    res.status(200).json(docsWithoutFirst);
  } else {
    return res.status(200).json([]);
  }
}
