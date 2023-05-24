import AlertToast from "@/components/toast/AlertToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function useDeleteThread(threadId, refreshPage) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { mutate: mutateDelete, isLoading } = useMutation(
    async () => {
      const { data } = await axios.delete(
        `/api/thread/delete?threadId=${threadId}&userId=${session.user.id}`
      );
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["threads"], {
          refetchPage: (_, index) => index === refreshPage,
        });
        toast.custom(
          () => <AlertToast text={`Your thred's has been deleted!`} />,
          { position: "bottom-center" }
        );
      },
    }
  );

  return { mutateDelete, isLoading };
}
