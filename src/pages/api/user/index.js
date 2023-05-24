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

  const { page, limit } = req.query;

  if (!page || !limit)
    return res
      .status(406)
      .json({ massage: "Please provide page and limit params" });

  const session = await getServerAuthSession(req, res);
  const cursorUser = session
    ? { cursor: { id: session.user.id }, select: { id: true } }
    : false;

  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          followedBy: true,
          follows: true,
        },
      },
      followedBy: cursorUser,
    },

    take: parseInt(limit) + 1,
    skip: (page - 1) * limit,
  });

  let nextPage = undefined;

  if (users.length > parseInt(limit)) {
    users.pop();
    nextPage = parseInt(page) + 1;
  }

  res.status(200).json({
    massage: "Success get user",
    users,
    nextPage,
  });
}
