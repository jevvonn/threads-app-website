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

  const {
    title,
    body,
    deletedSources,
    newSources,
    tags,
    userId,
    threadId,
    deletedTags,
  } = req.body;

  if (!userId || !threadId || !title || !body || !tags.length) {
    return res.status(400).json({ massage: "Bad Request" });
  }

  const thread = await prisma.thread.update({
    where: {
      id: threadId,
    },
    data: {
      title,
      body,
      sources: {
        create: newSources?.length ? newSources : undefined,
        delete: deletedSources?.length ? deletedSources : undefined,
      },
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
        disconnect: deletedTags.map((tag) => ({ where: { name: tag } })),
      },
    },
  });

  res.status(201).json({ massage: "Thread updates", threadId: thread.id });
}
