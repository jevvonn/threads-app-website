import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method != "DELETE")
    return res.status(405).json({ massage: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ massage: "User not authorized" });

  const { threadId } = req.body;

  const thread = await prisma.thread.delete({
    where: {
      id: threadId,
    },
  });

  res.status(201).json({ massage: "Thread deleted", threadId: thread.id });
}
