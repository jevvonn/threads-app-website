import SingleThread from "@/components/thread/SingleThread";
import Navbar from "@/components/navigation/Navbar";
import Head from "next/head";
import { useInfiniteQuery } from "@tanstack/react-query";
import FilterWidget from "@/components/navigation/FilterWidget";
import RecommendationSide from "@/components/user/RecommendationSide";
import FormNav from "@/components/navigation/FormNav";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const { data } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `/api/thread?page=${pageParam}&limit=10`
      );
      return data;
    },
    queryKey: ["threads"],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const threads = data?.pages.flatMap((page, idx) =>
    page.threads.map((thread) => ({ ...thread, page: idx }))
  );

  return (
    <>
      <Head>
        <title>Threds</title>
      </Head>

      <Navbar />
      <div className="w-full lg:w-3/4 md:p-3 flex gap-3 mx-auto mt-16">
        <div className="w-full lg:w-4/6 flex flex-col items-end gap-3">
          <FilterWidget />
          {session && <FormNav />}
          {threads ? (
            threads.map((thread) => (
              <SingleThread thread={thread} key={thread.id} />
            ))
          ) : (
            <ThreadSkeleton total={5} />
          )}
        </div>
        <RecommendationSide />
      </div>
    </>
  );
}
