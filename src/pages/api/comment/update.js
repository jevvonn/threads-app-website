import prisma from "../../../../prisma/prisma";
import { getServerAuthSession } from "../auth/[...nextauth]";
/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @returns
 */

export default async function handler(req, res) {
  if (req.method != "UPDATE")
    return res.status(405).json({ massage: "Method not allowed" });

  const session = await getServerAuthSession(req, res, authOptions);
  if (!session) return res.status(401).json({ massage: "User not authorized" });

  const { userId, threadId, body } = req.body;
  if (!userId || !body || !threadId)
    return res.status(400).json({ massage: "Bad Request" });

  if (session.user.id !== threadId) {
    return res.status(403).json({ massage: "Forbidden Request" });
  }

  const comment = await prisma.comment.update({
    where: {
      id: threadId,
    },

    data: {
      body,
    },
  });

  res.status(201).json({ massage: "Comment updated", commentId: comment.id });
}
