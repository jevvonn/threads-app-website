import FilterWidget from "@/components/navigation/FilterWidget";
import Navbar from "@/components/navigation/Navbar";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import UserSkeleton from "@/components/skeleton/UserSkeleton";
import SingleThread from "@/components/thread/SingleThread";
import UserCard from "@/components/user/UserCard";
import useInfiniteThreads from "@/hooks/thread/useInfiniteThreads";
import useInfiniteUsers from "@/hooks/user/useInfiniteUsers";
import Head from "next/head";
import { useState } from "react";

export default function Search({ q }) {
  const { users } = useInfiniteUsers(["users", { search: q }], q);
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
              {"Thred's"}
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
              {!!threads?.length && (
                <FilterWidget onFilter={onFilter} isFull={true} />
              )}
              <div className="flex flex-col gap-2">
                {threads?.map((thread) => (
                  <SingleThread
                    thread={thread}
                    key={thread.id}
                    needToCut={true}
                  />
                ))}
                {isLoading && <ThreadSkeleton total={5} />}
              </div>

              {!threads?.length && !isLoading && (
                <div className="flex justify-center w-full mt-20">
                  <h1 className="text-2xl">
                    No results for{" "}
                    <span className="text-primary italic">"{q}"</span>
                  </h1>
                </div>
              )}

              {isLoading && <ThreadSkeleton total={5} />}
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                {users?.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>

              {!users?.length && !isLoading && (
                <div className="flex justify-center w-full mt-20">
                  <h1 className="text-2xl">
                    No users name like{" "}
                    <span className="text-primary italic">"{q}"</span>
                  </h1>
                </div>
              )}

              {isLoading && <UserSkeleton total={5} />}
            </>
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
