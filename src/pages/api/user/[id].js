import prisma from "../../../../prisma/prisma";
import { getServerAuthSession } from "../auth/[...nextauth]";
/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 * @returns
 */

export default async function handler(req, res) {
  if (req.method != "GET")
    return res.status(405).json({ massage: "Method not allowed" });

  const session = await getServerAuthSession(req, res);
  const cursorUser = session ? { cursor: { id: session.user.id } } : false;
  const { id } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          followedBy: true,
          follows: true,
        },
      },
      followedBy: cursorUser,
      follows: cursorUser,
    },

    take: parseInt(limit) + 1,
    skip: (page - 1) * limit,
  });

  res.status(200).json({ massage: "Success get user", user });
}
