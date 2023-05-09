import prisma from "../../../../prisma/prisma";
import { getServerAuthSession } from "../auth/[...nextauth]";
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
      .json({ massage: "Please provide page and limit params" });

  const session = await getServerAuthSession(req, res);
  const cursorUser = session ? { cursor: { id: session.user.id } } : false;

  const threads = await prisma.thread.findMany({
    where: {
      isDraft: false,
    },
    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: {
          comments: true,
          likedBy: true,
          savedBy: true,
          votedDownBy: true,
          votedUpBy: true,
        },
      },
      likedBy: cursorUser,
      savedBy: cursorUser,
      votedDownBy: cursorUser,
      votedUpBy: cursorUser,
    },

    take: parseInt(limit),
    skip: (page - 1) * limit,
  });

  res.status(200).json({ massage: "Success get threads", threads });
}
