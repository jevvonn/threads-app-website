import prisma from "../../../../../prisma/prisma";
import { getServerAuthSession } from "../../auth/[...nextauth]";
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

  const { id, hasLiked } = req.body;

  await prisma.comment.update({
    where: {
      id,
    },
    data: {
      likedBy: hasLiked
        ? {
            disconnect: {
              id: session.user.id,
            },
          }
        : {
            connect: {
              id: session.user.id,
            },
          },
    },
  });

  res.status(201).json({ massage: "Liked success" });
}
