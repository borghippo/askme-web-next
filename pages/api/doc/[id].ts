import { getDocQueryString } from "@/utils/getQueryString";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { id } = req.query;
  const results = await fetch(getDocQueryString(id as string));
  const document = await results.json();
  res.status(200).json(document);
}