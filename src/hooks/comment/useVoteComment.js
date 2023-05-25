import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useVoteComment(commentId) {
  const { mutate: mutateVote } = useMutation(
    async ({ hasVoted, hasVotedType, voteType }) => {
      const { data } = await axios.post("/api/comment/action/vote", {
        id: commentId,
        hasVoted,
        hasVotedType,
        voteType,
      });
      return data;
    }
  );

  return { mutateVote };
}
