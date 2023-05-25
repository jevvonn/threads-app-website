import AlertToast from "@/components/toast/AlertToast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function useCreateComment() {
  const { mutate: mutateCreateComment, isLoading } = useMutation(
    async ({ threadId, parentId, repliedToId, body }) => {
      const { data } = await axios.post("/api/comment/create", {
        threadId,
        parentId,
        repliedToId,
        body,
      });
      return data;
    }
  );

  return { mutateCreateComment, isLoading };
}
