import fs from "fs/promises";
import { type NextApiRequest, type NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rand = Math.random();
  await fs.writeFile(
    `./logs/${rand.toString()}`,
    JSON.stringify(req.body, null, 2)
  );
  res.json({ status: "ok" });
  res.end();
}
