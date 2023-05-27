import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useInfiniteThreads(cacheKey, filter, tag, userId) {
  const URL = (pageParam) =>
    `/api/thread?page=${pageParam}&limit=5&filter=${filter ? filter : ""}&tag=${
      tag ? tag : ""
    }&userId=${userId ? userId : ""}`;

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

  const threads = data?.pages.flatMap((page, idx) =>
    page.threads.map((thread) => ({ ...thread, page: idx }))
  );

  return { threads, hasNextPage, fetchNextPage, isFetching, isLoading };
}
