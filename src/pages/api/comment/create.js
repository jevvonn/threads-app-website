import prisma from "../../../../prisma/prisma";
import { getServerAuthSession } from "../auth/[...nextauth]";
/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @returns
 */

export default async function handler(req, res) {
  if (req.method != "POST")
    return res.status(405).json({ massage: "Method not allowed" });

  const session = await getServerAuthSession(req, res);
  if (!session) return res.status(401).json({ massage: "User not authorized" });

  const { threadId, parentId, repliedToId, body } = req.body;

  if (!threadId) {
    return res.status(400).json({ massage: "Bad Request" });
  }

  const comment = await prisma.comment.create({
    data: {
      body,
      repliedTo: repliedToId
        ? {
            connect: {
              id: repliedToId,
            },
          }
        : undefined,
      parent: parentId
        ? {
            connect: {
              id: parentId,
            },
          }
        : undefined,
      thread: {
        connect: {
          id: threadId,
        },
      },
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  res.status(201).json({ massage: "Comment created", commentId: comment.id });
}
