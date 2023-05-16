import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSingleThread(id) {
  const { data: thread, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/thread/${id}`);
      return data.thread;
    },
    queryKey: ["thread", { id }],
  });

  return { thread, isLoading };
}
