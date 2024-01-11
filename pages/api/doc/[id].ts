import { getDocQueryString } from "@/utils/getQueryString";
import type { NextApiRequest, NextApiResponse } from "next";


// This should model the structure of the data object. The message property is left
// over from when there was a potential error message in the response. Should now use
// types from types.ts. It is not clear whether the tsc command will actually check 
// this, but it is good to have this for documentation purposes anyway.
type ResponseData = {
  message: string;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { id } = req.query;
  const results = await fetch(getDocQueryString(id as string));
  const data = await results.json();
  res.status(results.status).json(data);
}
