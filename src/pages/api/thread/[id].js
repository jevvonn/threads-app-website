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

  const session = await getServerAuthSession(req, res);
  const cursorUser = session ? { cursor: { id: session.user.id } } : false;
  const { id } = req.query;

  const thread = await prisma.thread.findUnique({
    where: {
      id,
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
      tags: true,
      user: true,
      sources: true,
      category: true,
    },
  });

  res.status(200).json({ massage: "Success get thread", thread });
}
