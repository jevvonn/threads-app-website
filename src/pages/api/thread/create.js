import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method != "POST")
    return res.status(405).json({ massage: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ massage: "User not authorized" });

  const { type, title, body, source, draft, tags, categoryId } = req.body;

  const thread = await prisma.thread.create({
    data: {
      type,
      title,
      body,
      draft,
      source: {
        createMany: { data: source },
      },
      tags: {
        connectOrCreate: tags.map((tag) =>
          tag.exist
            ? { where: { name: tag.name } }
            : { create: { name: tag.name } }
        ),
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
      user: {
        session: {
          id: session.user.id,
        },
      },
    },
  });

  res.status(201).json({ massage: "Thread created" });
}
