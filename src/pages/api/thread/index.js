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

  const { page, limit, filter, tag, userId } = req.query;

  if (!page || !limit)
    return res
      .status(406)
      .json({ massage: "Please provide page and limit params" });

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
    case "oldest":
      orderBy.createdAt = "asc";
    default:
      orderBy.createdAt = "desc";
      break;
  }

  const session = await getServerAuthSession(req, res);
  const cursorUser = session
    ? { cursor: { id: session.user.id }, select: { id: true } }
    : false;

  const threads = await prisma.thread.findMany({
    where: {
      tags: tag
        ? {
            some: {
              name: {
                equals: tag,
              },
            },
          }
        : undefined,
      userId: userId ? userId : undefined,
    },
    orderBy,
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
    },

    take: parseInt(limit) + 1,
    skip: (page - 1) * limit,
  });

  let nextPage = undefined;

  if (threads.length > parseInt(limit)) {
    threads.pop();
    nextPage = parseInt(page) + 1;
  }

  res.status(200).json({
    massage: "Success get threads",
    threads,
    nextPage,
  });
}
