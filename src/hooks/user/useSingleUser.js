import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSingleUser(id) {
  const { data: user, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/${id}`);
      return data.user;
    },
    queryKey: ["users", { id }],
  });

  return { user, isLoading };
}
