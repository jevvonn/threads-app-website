import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function useUpdateComment() {
  const { data: session } = useSession();

  const { mutate: mutateUpdate, isLoading } = useMutation(
    async ({ commentId, body }) => {
      const { data } = await axios.put("/api/comment/update", {
        commentId,
        userId: session.user.id,
        body,
      });
      return data;
    },
    {
      onMutate: () => {
        toast.loading(`Updating your comment...`, {
          id: "action-notification",
        });
      },
    }
  );

  return { mutateUpdate, isLoading };
}
