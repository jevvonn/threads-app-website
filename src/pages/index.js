import SingleThread from "@/components/thread/SingleThread";
import Navbar from "@/components/navigation/Navbar";
import Head from "next/head";
import FilterWidget from "@/components/navigation/FilterWidget";
import RecommendationSide from "@/components/user/RecommendationSide";
import FormNav from "@/components/navigation/FormNav";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import { useSession } from "next-auth/react";
import useInfiniteThreads from "@/hooks/thread/useInfiniteThreads";
import { useEffect } from "react";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function Home() {
  const { data: session } = useSession();
  const scrollPosition = useScrollPosition();

  const { threads, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteThreads(["threads"]);

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

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
          {threads
            ? threads.map((thread) => (
                <SingleThread
                  thread={thread}
                  key={thread.id}
                  needToCut={true}
                />
              ))
            : null}
          {isFetching && <ThreadSkeleton total={5} />}
        </div>
        <RecommendationSide />
      </div>
    </>
  );
}
