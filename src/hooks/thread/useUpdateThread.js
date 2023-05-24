import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function useUpdateThread() {
  const router = useRouter();

  const { mutate: mutateUpdatePost, isLoading } = useMutation(
    async ({
      title,
      body,
      deletedSources,
      newSources,
      tags,
      userId,
      threadId,
      deletedTags,
    }) => {
      const initialData = {
        title,
        body,
        deletedSources,
        newSources,
        tags,
        userId,
        threadId,
        deletedTags,
      };

      const { data } = await axios.put("/api/thread/update", initialData);
      return data;
    },
    {
      onMutate: () => {
        toast.loading(`Updating your Thread's`, {
          id: "uploadThread",
        });
      },
      onSuccess: (data) => {
        toast.success("Your Thred has been updated", {
          id: "uploadThread",
        });
        router.push(`/t/${data.threadId}`);
      },
      onError: () => {
        toast.error("Something went wrong", {
          id: "uploadThread",
        });
        router.push(`/`);
      },
    }
  );

  return { mutateUpdatePost, isLoading };
}
