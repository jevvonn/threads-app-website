import AlertToast from "@/components/toast/AlertToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function useMutationSave(threadId, refreshPage) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { mutate: mutateSave } = useMutation(
    async ({ hasSaved }) => {
      const { data } = await axios.post("/api/thread/action/save", {
        id: threadId,
        hasSaved,
      });
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["threads"], {
          refetchPage: (_, index) => index === refreshPage,
        });
        await queryClient.invalidateQueries(["thread", { id: threadId }]);
        toast.custom(() => <AlertToast text={`Your save has been update!`} />, {
          position: "bottom-center",
          id: "action-notification",
        });
      },
    }
  );

  const handleSave = (hasSaved) => {
    if (!session) {
      return toast.custom(
        () => (
          <AlertToast text={`Login to save this Thred's!`} isSuccess={false} />
        ),
        { position: "bottom-center" }
      );
    }

    mutateSave({ hasSaved });
  };

  return { handleSave };
}
