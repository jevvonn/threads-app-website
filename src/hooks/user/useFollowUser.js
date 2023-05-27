import AlertToast from "@/components/toast/AlertToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useFollowUser() {
  const queryClient = useQueryClient();

  const { mutate: followUser, isLoading } = useMutation(
    async ({ id, hasFollowed }) => {
      const { data } = await axios.post(`/api/user/action/follow`, {
        id,
        hasFollowed,
      });
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["users"]);
      },
    }
  );

  return { followUser, isLoading };
}
