import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function usePaginateReply(
  threadId,
  commentId,
  cacheKey,
  filter
) {
  const URL = (pageParam) =>
    `/api/comment/replies?page=${pageParam}&limit=5&threadId=${threadId}&commentId=${commentId}&sort=createdAt&filter=${
      filter ? filter : ""
    }`;

  const { data, hasNextPage, fetchNextPage, isFetching, refetch } =
    useInfiniteQuery({
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axios.get(URL(pageParam));
        return data;
      },
      queryKey: [...cacheKey],
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
      enabled: false,
    });

  const comments = data?.pages.flatMap((page, idx) =>
    page.comments.map((thread) => ({ ...thread, page: idx }))
  );

  return { comments, hasNextPage, fetchNextPage, isFetching, refetch };
}
