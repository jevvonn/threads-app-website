import prisma from "../../../../prisma/prisma";
import { getServerAuthSession } from "../auth/[...nextauth]";
/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @returns
 */

export default async function handler(req, res) {
  if (req.method != "PUT")
    return res.status(405).json({ massage: "Method not allowed" });

  const session = await getServerAuthSession(req, res);
  if (!session) return res.status(401).json({ massage: "User not authorized" });

  const { userId, commentId, body } = req.body;
  if (!userId || !body || !commentId)
    return res.status(400).json({ massage: "Bad Request" });

  if (session.user.id !== session.user.id) {
    return res.status(403).json({ massage: "Forbidden Request" });
  }

  const comment = await prisma.comment.update({
    where: {
      id: commentId,
    },

    data: {
      body,
    },
  });

  res.status(201).json({ massage: "Comment updated", commentId: comment.id });
}
