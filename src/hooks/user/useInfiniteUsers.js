import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import useScrollPosition from "../useScrollPosition";
import { useEffect } from "react";

export default function useInfiniteUsers(cacheKey, search) {
  const URL = (pageParam) =>
    `/api/user?page=${pageParam}&limit=5&search=${search ? search : ""}`;
  const scrollPosition = useScrollPosition();

  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axios.get(URL(pageParam));
        return data;
      },
      queryKey: [...cacheKey],
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
    });

  const users = data?.pages.flatMap((page, idx) =>
    page.users.map((user) => ({ ...user, page: idx }))
  );

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  return { users, isFetching, isLoading };
}
