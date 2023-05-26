import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function useDeleteComment(commentId) {
  const { data: session } = useSession();

  const { mutate: mutateDelete, isLoading } = useMutation(async () => {
    const { data } = await axios.delete(
      `/api/comment/delete?commentId=${commentId}&userId=${session.user.id}`
    );
    return data;
  });

  return { mutateDelete, isLoading };
}
