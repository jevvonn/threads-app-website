import SingleThread from "@/components/thread/SingleThread";
import Navbar from "@/components/navigation/Navbar";
import Head from "next/head";
import FilterWidget from "@/components/navigation/FilterWidget";
import RecommendationSide from "@/components/user/RecommendationSide";
import FormNav from "@/components/navigation/FormNav";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import { useSession } from "next-auth/react";
import useInfiniteThreads from "@/hooks/thread/useInfiniteThreads";
import BaseFollowingWidget from "@/components/navigation/BaseFollowingWidget";

export default function Home() {
  const queryKey = ["threads"];
  const { data: session } = useSession();

  const { threads, isFetching, onFilter, changeBase, filter, base } =
    useInfiniteThreads(queryKey);

  return (
    <>
      <Head>
        <title>Threds</title>
      </Head>

      <Navbar />
      <div className="w-full lg:w-3/4 md:p-3 flex gap-3 mx-auto mt-16">
        <div className="w-full lg:w-4/6 flex flex-col items-end gap-3">
          <FilterWidget filter={filter} onFilter={onFilter} />
          {session && (
            <>
              <FormNav />
              <BaseFollowingWidget base={base} changeBase={changeBase} />
            </>
          )}

          {threads
            ? threads.map((thread) => (
                <SingleThread
                  thread={thread}
                  key={thread.id}
                  needToCut={true}
                />
              ))
            : null}
          {!threads?.length && !isFetching && (
            <div className="flex justify-center w-full mt-20">
              <h1 className="text-2xl text-center">Nothing to show here.</h1>
            </div>
          )}
          {isFetching && <ThreadSkeleton total={5} />}
        </div>
        <RecommendationSide />
      </div>
    </>
  );
}
