import { getServerSession } from "next-auth";
import prisma from "../../../../../prisma/prisma";
import { authOptions } from "../../auth/[...nextauth]";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @returns
 */

export default async function handler(req, res) {
  if (req.method != "GET")
    return res.status(405).json({ massage: "Method not allowed" });

  const { page, limit } = req.query;

  if (!page || !limit)
    return res
      .status(406)
      .json({ massage: "Please provide page and limit params " });

  const threads = await prisma.thread.findMany({
    where: {
      draft: false,
    },
    orderBy: {
      created_at: "desc",
    },

    include: {
      _count: {
        select: {
          likes: true,
          vote_up: true,
          vote_down: true,
          saved: true,
          comments: true,
        },
      },

      tags: true,
      category: true,
      user: true,
      source: true,
    },

    take: parseInt(limit),
    skip: (page - 1) * limit,
  });

  res.status(200).json({ massage: "Success get threads", threads });
}
