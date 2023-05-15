import AlertToast from "@/components/toast/AlertToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function useMutationVote(threadId, refetchPage) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { mutate: mutateVote } = useMutation(
    async ({ hasVoted, hasVotedType, voteType }) => {
      const { data } = await axios.post("/api/thread/action/vote", {
        id: threadId,
        hasVoted,
        hasVotedType,
        voteType,
      });
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["threads"], {
          refetchPage: (_, index) => index === refetchPage,
        });
        toast.custom(
          () => <AlertToast text={`Your vote has been recorded!`} />,
          {
            position: "bottom-center",
          }
        );
      },
    }
  );

  const handleVote = (voteType, hasVotedUp, hasVotedDown) => {
    if (!session) {
      return toast.custom(
        () => (
          <AlertToast text={`Login to vote this Thred's!`} isSuccess={false} />
        ),
        { position: "bottom-center" }
      );
    }

    const data = {
      hasVoted: hasVotedUp || hasVotedDown ? true : false,
      hasVotedType: hasVotedUp ? "voted_up" : "voted_down",
      voteType,
    };

    mutateVote(data);
  };

  return { handleVote };
}
