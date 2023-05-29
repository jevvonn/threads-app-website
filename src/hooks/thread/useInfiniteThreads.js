import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useScrollPosition from "../useScrollPosition";

export default function useInfiniteThreads(
  cacheKey,
  tag = "",
  userId = "",
  search = ""
) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [base, setBase] = useState("");

  const URL = (pageParam) =>
    `/api/thread?page=${pageParam}&limit=5&filter=${filter}&tag=${tag}&userId=${userId}&search=${search}&base=${base}`;
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

  const threads = data?.pages.flatMap((page, idx) =>
    page.threads.map((thread) => ({ ...thread, page: idx }))
  );

  const onFilter = (filterName) => {
    queryClient.removeQueries({ queryKey: [...cacheKey] });
    setFilter(filterName);
  };

  const changeBase = (baseName) => {
    queryClient.removeQueries({ queryKey: [...cacheKey] });
    setBase(baseName);
  };

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: [...cacheKey] });
  }, [filter]);

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  return {
    threads,
    isFetching,
    isLoading,
    onFilter,
    filter,
    base,
    changeBase,
  };
}
