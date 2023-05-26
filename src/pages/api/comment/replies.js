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

  const { page, limit, commentId, threadId } = req.query;

  if (!page || !limit || !commentId || !threadId)
    return res
      .status(406)
      .json({ massage: "Please provide page and limit params and threadId" });

  const session = await getServerAuthSession(req, res);
  const cursorUser = session
    ? { cursor: { id: session.user.id }, select: { id: true } }
    : false;

  const comments = await prisma.comment.findMany({
    where: {
      parentId: commentId,
      threadId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          likedBy: true,
          votedDownBy: true,
          votedUpBy: true,
        },
      },
      repliedTo: {
        include: {
          user: true,
        },
      },
      likedBy: cursorUser,
      votedDownBy: cursorUser,
      votedUpBy: cursorUser,
      user: true,
    },

    take: parseInt(limit) + 1,
    skip: (page - 1) * limit,
  });

  let nextPage = undefined;

  if (comments.length > parseInt(limit)) {
    comments.pop();
    nextPage = parseInt(page) + 1;
  }

  res.status(200).json({
    massage: "Success get comments",
    comments,
    nextPage,
  });
}
