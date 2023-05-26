import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method != "DELETE")
    return res.status(405).json({ massage: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ massage: "User not authorized" });

  const { commentId, userId } = req.query;

  if (!commentId || !userId) {
    return res.status(400).json({ massage: "Bad request" });
  }

  if (session.user.id !== userId) {
    return res.status(403).json({ massage: "Forbidden request" });
  }

  await prisma.comment.updateMany({
    where: {
      parentId: commentId,
    },
    data: {
      repliedToId: null,
    },
  });

  await prisma.comment.deleteMany({
    where: {
      parentId: commentId,
    },
  });

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  res.status(201).json({ massage: "comment deleted" });
}
