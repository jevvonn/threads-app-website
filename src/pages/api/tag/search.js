/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @returns
 */

import prisma from "../../../../prisma/prisma";

export default async function handler(req, res) {
  const { query } = req.query;

  const tags = await prisma.tag.findMany({
    where: {
      name: {
        contains: query ? query : "",
      },
    },
    take: 5,
  });

  res.status(200).json({ message: "Success get tags", tags });
}
