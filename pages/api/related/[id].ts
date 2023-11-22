import { getRelatedQueryString } from "@/utils/getQueryString";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { id } = req.query;
  const results = await fetch(getRelatedQueryString(id as string));
  const data = await results.json();
  res.status(200).json(data);
}
