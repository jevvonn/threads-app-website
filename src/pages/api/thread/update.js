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

  const { type, title, body, threadSources, tags, categoryId, threadId } =
    req.body;
  if (!type || !title || !body || !threadSources || !tags || !categoryId)
    return res.status(400).json({ massage: "Bad Request" });

  const thread = await prisma.thread.update({
    where: {
      id: threadId,
    },

    data: {
      type,
      title,
      body,
      sources: {
        createMany: threadSources.map((source) => ({ data: source })),
      },
      tags: {
        connectOrCreate: tags.map((tag) => {
          return { where: { name: tag.name }, create: { name: tag.name } };
        }),
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  res.status(201).json({ massage: "Thread updated", threadId: thread.id });
}
