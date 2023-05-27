import Navbar from "@/components/navigation/Navbar";
import SingleThread from "@/components/thread/SingleThread";
import useSingleThread from "@/hooks/thread/useSingleThread";
import { useRouter } from "next/router";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import UserInfo from "@/components/user/UserInfo";
import Head from "next/head";
import TagItem from "@/components/thread/addition/TagItem";
import { useSession } from "next-auth/react";
import CommentForm from "@/components/comment/create/CommentForm";
import UserInfoSkeleton from "@/components/skeleton/UserInfoSkeleton";
import SingleComment from "@/components/comment/SingleComment";
import useInfiniteComments from "@/hooks/comment/useInfiniteComment";
import Link from "next/link";
import useScrollPosition from "@/hooks/useScrollPosition";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";


export default function Thread() {
  const router = useRouter();
  const { id } = router.query;
  const { thread, isLoading } = useSingleThread(id);
  const { comments, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteComments(id, ["comments", { threadId: id }]);
  const { data: session } = useSession();
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  return (
    <>
      <Head>
        <title>{thread ? thread.title : "Thred"}</title>
      </Head>

      <Navbar />

      <div className="md:w-11/12 lg:gap-3 flex p-3 mt-16 mx-auto">
        <div className="w-full lg:w-8/12 flex flex-col items-end gap-3">
          {isLoading && <ThreadSkeleton total={1} />}
          {thread && (
            <>
              <SingleThread thread={thread} isLink={false} />
              <div className="w-full md:w-11/12 flex flex-col gap-3">
                <div className="lg:hidden flex flex-col items-center gap-5 w-full py-4 border">
                  <div className="w-11/12 flex flex-wrap gap-1">
                    {thread.tags.map((tag) => (
                      <TagItem key={tag.name} tag={tag} />
                    ))}
                  </div>
                </div>
                {session && <CommentForm thread={thread} />}
                <div className="divider text-slate-400">comments</div>
                <div>
                  {comments?.map((comment) => (
                    <SingleComment
                      comment={comment}
                      thread={thread}
                      key={comment.id}
                    />
                  ))}
                  {isFetching && (
                    <div className="w-full flex justify-center">
                      <AiOutlineLoading className="animate-spin" size={40} />
                    </div>
                  )}
                </div>
                {!comments?.length && (
                  <p className="flex w-full justify-center">
                    Be the first comment !
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        {thread && <UserInfo thread={thread} />}
        {isLoading && <UserInfoSkeleton />}
      </div>
      {thread === null && (
        <div className="w-full flex justify-center flex-col items-center gap-3">
          <h3 className="font-bold text-lg">Post cannot be found.</h3>
          <Link href={"/"} className="underline font-semibold text-blue-500">
            Go Back To Home
          </Link>
        </div>
      )}
    </>
  );
}
