import Navbar from "@/components/navigation/Navbar";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import SingleThread from "@/components/thread/SingleThread";
import useInfiniteSavedThread from "@/hooks/user/useInfiniteSavedThread";
import { getServerAuthSession } from "./api/auth/[...nextauth]";

export default function SavedThread() {
  const { threads, isLoading } = useInfiniteSavedThread([
    "threads",
    { isSaved: true },
  ]);

  return (
    <>
      <Navbar />

      <div className="w-full lg:w-3/4 p-3 flex justify-center gap-3 mx-auto mt-16">
        <div className="w-full lg:w-4/6 flex flex-col items-end gap-3">
          <h1 className="w-full py-3 text-center text-3xl font-semibold">
            My <span className="text-primary">Saved</span> Post
          </h1>
          {threads?.map((thread) => (
            <SingleThread key={thread.id} thread={thread} />
          ))}

          {!threads?.length && !isLoading && (
            <div className="flex justify-center w-full mt-20">
              <h1 className="text-xl text-center">
                You haven't saved any thred yet.
                <br />
                Start saving some thred to see them here.
              </h1>
            </div>
          )}

          {isLoading && <ThreadSkeleton total={5} />}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getServerAuthSession(context.req, context.res);

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
