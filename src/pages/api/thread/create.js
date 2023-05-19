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

  const { type, title, body, threadSources, tags } = req.body;

  if (!type || !title || !body || !tags.length) {
    return res.status(400).json({ massage: "Bad Request" });
  }

  const thread = await prisma.thread.create({
    data: {
      type,
      title,
      body,
      sources: threadSources
        ? {
            createMany: threadSources.map((source) => ({ data: source })),
          }
        : undefined,
      tags: {
        connectOrCreate: tags.map((tag) => {
          return { where: { name: tag }, create: { name: tag } };
        }),
      },
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  res.status(201).json({ massage: "Thread created", threadId: thread.id });
}
