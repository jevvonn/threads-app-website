import FilterWidget from "@/components/navigation/FilterWidget";
import Navbar from "@/components/navigation/Navbar";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import SingleThread from "@/components/thread/SingleThread";
import useInfiniteThreads from "@/hooks/thread/useInfiniteThreads";
import Head from "next/head";

export default function Tags({ q }) {
  const queryKey = ["threads", { tag: q }];
  const { threads, isLoading, onFilter } = useInfiniteThreads(queryKey, q);

  return (
    <>
      <Head>
        <title>Tag : {q}</title>
      </Head>

      <Navbar />

      <div className="lg:w-3/5 p-2 lg:pb-10 mx-auto mt-16">
        <div className="mt-5 flex flex-col gap-5">
          <h2 className="my-0 text-xl">
            Filter by tags: <span className="italic">{q}</span>
          </h2>
          <FilterWidget onFilter={onFilter} isFull={true} />
          <div className="flex flex-col gap-5">
            {threads?.map((thread) => (
              <SingleThread thread={thread} key={thread.id} />
            ))}
            {isLoading && <ThreadSkeleton total={5} />}
          </div>
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
