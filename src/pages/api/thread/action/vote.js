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

  const { id, hasVoted, hasVotedType, voteType } = req.body;
  const data = {};

  switch (voteType) {
    case "vote_up":
      if (hasVoted) {
        if (hasVotedType === "voted_up") {
          data.votedUpBy = {
            disconnect: {
              id: session.user.id,
            },
          };

          break;
        }

        if (hasVotedType === "voted_down") {
          data.votedDownBy = {
            disconnect: {
              id: session.user.id,
            },
          };
        }
      }

      data.votedUpBy = {
        connect: {
          id: session.user.id,
        },
      };
      break;
    case "vote_down":
      if (hasVoted) {
        if (hasVotedType === "voted_down") {
          data.votedDownBy = {
            disconnect: {
              id: session.user.id,
            },
          };

          break;
        }

        if (hasVotedType === "voted_up") {
          data.votedUpBy = {
            disconnect: {
              id: session.user.id,
            },
          };
        }
      }

      data.votedDownBy = {
        connect: {
          id: session.user.id,
        },
      };
      break;
  }

  await prisma.thread.update({
    where: {
      id,
    },
    data,
  });

  res.status(201).json({ massage: "Voted success" });
}
