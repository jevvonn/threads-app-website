import AlertToast from "@/components/toast/AlertToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function useMutationLike(threadId, refreshPage) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { mutate: mutateLike } = useMutation(
    async ({ hasLiked }) => {
      const { data } = await axios.post("/api/thread/action/like", {
        id: threadId,
        hasLiked,
      });
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["threads"], {
          refetchPage: (_, index) => index === refreshPage,
        });
        await queryClient.invalidateQueries(["thread", { id: threadId }]);
        toast.custom(
          () => <AlertToast text={`Your like has been recorded!`} />,
          { position: "bottom-center", id: "action-notification"}
        ); 
      },
    }
  );

  const handleLike = (hasLiked) => {
    if (!session) {
      return toast.custom(
        () => (
          <AlertToast text={`Login to likes this Thred's!`} isSuccess={false} />
        ),
        { position: "bottom-center" }
      );
    }

    mutateLike({ hasLiked });
  };

  return { handleLike };
}
