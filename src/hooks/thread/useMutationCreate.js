import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function useMutationCreate() {
  const router = useRouter();

  const { mutate: mutatePost, isLoading } = useMutation(
    async ({ title, body, tags, type, isDraft }) => {
      const initialData = {
        title,
        body,
        tags,
        type,
        isDraft,
      };

      const { data } = await axios.post("/api/thread/create", initialData);
      return data;
    },
    {
      onMutate: () => {
        toast.loading(`Posting your Thread's`, {
          id: "uploadThread",
        });
      },
      onSuccess: (data) => {
        toast.success("Your Thred has been posted", {
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

  return { mutatePost, isLoading };
}
