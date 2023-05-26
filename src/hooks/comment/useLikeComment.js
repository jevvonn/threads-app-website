import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useLikeComment(commentId) {
  const { mutate: mutateLike } = useMutation(async ({ hasLiked }) => {
    const { data } = await axios.post("/api/comment/action/like", {
      id: commentId,
      hasLiked,
    });
    return data;
  });

  return { mutateLike };
}
