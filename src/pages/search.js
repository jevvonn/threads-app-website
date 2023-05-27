import FilterWidget from "@/components/navigation/FilterWidget";
import Navbar from "@/components/navigation/Navbar";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import SingleThread from "@/components/thread/SingleThread";
import useInfiniteThreads from "@/hooks/thread/useInfiniteThreads";
import Head from "next/head";
import { useState } from "react";

export default function Search({ q }) {
  // const { users, isFetching } = useInfiniteUsers(["users", "recommendation"]);
  const [tab, setTab] = useState("THREAD");
  const queryKey = ["threads", { search: q }];
  const { threads, isLoading, onFilter } = useInfiniteThreads(
    queryKey,
    "",
    "",
    q
  );

  return (
    <>
      <Head>
        <title>Search: {q}</title>
      </Head>
      <Navbar />

      <div className="lg:w-3/5 p-2 lg:pb-10 mx-auto mt-16">
        <div className="mt-5 flex flex-col gap-5">
          <h2 className="my-0 text-xl">
            Search results for: <span className="italic">{q}</span>
          </h2>
          <div className="flex">
            <button
              onClick={() => setTab("THREAD")}
              className={
                tab == "THREAD"
                  ? `activeTabStyle rounded-l font-semibold`
                  : `baseStyleTab rounded-l font-semibold`
              }
            >
              Threads
            </button>
            <button
              onClick={() => setTab("USER")}
              className={
                tab == "USER"
                  ? `activeTabStyle rounded-r font-semibold`
                  : `baseStyleTab rounded-r font-semibold`
              }
            >
              Users
            </button>
          </div>
          {tab == "THREAD" ? (
            <>
              <FilterWidget onFilter={onFilter} isFull={true} />
              <div className="flex flex-col gap-5">
                {threads?.map((thread) => (
                  <SingleThread thread={thread} key={thread.id} />
                ))}
                {isLoading && <ThreadSkeleton total={5} />}
              </div>
            </>
          ) : (
            <div>ok</div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = (ctx) => {
  const { q } = ctx.query;

  if (!q)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      q,
    },
  };
};
