import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useInfiniteUsers(cacheKey) {
  const URL = (pageParam) => `/api/user?page=${pageParam}&limit=5`;

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(URL(pageParam));
      return data;
    },
    queryKey: [...cacheKey],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const users = data?.pages.flatMap((page, idx) =>
    page.users.map((thread) => ({ ...thread, page: idx }))
  );

  return { users, hasNextPage, fetchNextPage, isFetching };
}
