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

  const { page, limit, filter, threadId } = req.query;

  if (!page || !limit || !threadId)
    return res
      .status(406)
      .json({ massage: "Please provide page and limit params and threadId" });

  let orderBy = {};
  switch (filter) {
    case "most_voted":
      orderBy.votedUpBy = {
        _count: "desc",
      };
      break;
    case "least_voted":
      orderBy.votedDownBy = {
        _count: "asc",
      };
      break;
    case "most_liked":
      orderBy.likedBy = {
        _count: "desc",
      };
      break;
    case "least_liked":
      orderBy.likedBy = {
        _count: "asc",
      };
      break;
    default:
      orderBy.createdAt = "desc";
      break;
  }

  const session = await getServerAuthSession(req, res);
  const cursorUser = session
    ? { cursor: { id: session.user.id }, select: { id: true } }
    : false;

  const comments = await prisma.comment.findMany({
    where: {
      threadId,
      parent: null,
    },
    orderBy,
    include: {
      _count: {
        select: {
          likedBy: true,
          votedDownBy: true,
          votedUpBy: true,
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
