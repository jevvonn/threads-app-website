import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/prisma";
import { authOptions } from "../auth/[...nextauth]";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @returns
 */

export default async function handler(req, res) {
  if (req.method != "GET")
    return res.status(405).json({ massage: "Method not allowed" });

  const { id } = req.query;

  const thread = await prisma.thread.findUnique({
    where: {
      id,
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
  });

  res.status(200).json({ massage: "Success get thread", thread });
}
