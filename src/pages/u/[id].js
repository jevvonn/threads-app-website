import FilterWidget from "@/components/navigation/FilterWidget";
import Navbar from "@/components/navigation/Navbar";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import SingleThread from "@/components/thread/SingleThread";
import ButtonFollow from "@/components/user/ButtonFollow";
import useInfiniteThreads from "@/hooks/thread/useInfiniteThreads";
import useSingleUser from "@/hooks/user/useSingleUser";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSingleUser(id);
  const { data: session } = useSession();

  const queryKey = ["threads", { userId: id }];

  const { threads, isFetching, onFilter } = useInfiniteThreads(
    queryKey,
    "",
    id
  );

  return (
    <>
      <Head>
        <title>{user?.name ? user.name : "Thred'er"}</title>
      </Head>

      <Navbar />
      {user && (
        <div className="w-full lg:w-3/4 py-3 flex gap-3 mx-auto mt-16">
          <div className="lg:w-8/12 w-full md:px-3 lg:px-0 flex flex-col items-end gap-3">
            <div className="w-full md:w-11/12 lg:h-32 flex gap-4 lg:items-center border rounded p-4">
              <div>
                <div className="avatar w-16">
                  <div className="w-16 rounded-full border">
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      alt={user.name}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-3 lg:gap-3">
                <div>
                  <span className="font-semibold text-xl">{user.name}</span>
                  <div className="lg:hidden flex gap-2">
                    <div className=" flex gap-2">
                      <span className="font-semibold">
                        {user._count.follows}
                      </span>
                      <p>Following</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold">
                        {user._count.followedBy}
                      </span>
                      <p>Follower</p>
                    </div>
                  </div>
                </div>
                {user.id !== session.user.id ? (
                  <ButtonFollow user={user} />
                ) : (
                  <Link
                    href={"/profile-setting"}
                    className="btn btn-primary btn-outline text-white w-full btn-sm flex gap-1 text-sm rounded normal-case hover:text-white items-center"
                  >
                    Profile Setting
                  </Link>
                )}
              </div>
            </div>
            <FilterWidget onFilter={onFilter} />
            {threads?.map((thread) => (
              <SingleThread thread={thread} needToCut={true} key={thread.id} />
            ))}
            {isFetching && <ThreadSkeleton total={5} />}
          </div>
          <div className="hidden w-4/12 lg:flex flex-col gap-6">
            <div className="h-32 flex justify-center items-center font-semibold border rounded">
              <div className="w-2/6 flex flex-col items-center text-lg">
                <span>{user._count.followedBy}</span>
                <p>Follower</p>
              </div>
              <div className="w-2/6 flex flex-col items-center text-lg">
                <span>{user._count.follows}</span>
                <p>Following</p>
              </div>
            </div>
            <div className="w-full hidden border rounded lg:flex flex-col">
              <h2 className="w-full py-2 flex justify-center items-center bg-primary rounded-t font-semibold text-xl text-white">
                About Account
              </h2>
              <div className="px-4 py-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full border">
                      <Image
                        src={user.image}
                        width={50}
                        height={50}
                        alt={user.name}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <span className="font-semibold">{user.name}</span>
                </div>
                {user.bio ? (
                  <p>{user.bio}</p>
                ) : (
                  <p className="text-slate-500 italic">
                    {user.name} doesn't have a bio.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {user === null && (
        <div className="w-full flex justify-center flex-col items-center gap-3 mt-20">
          <h3 className="font-bold text-lg">User cannot be found.</h3>
          <Link href={"/"} className="underline font-semibold text-blue-500">
            Go Back To Home
          </Link>
        </div>
      )}
    </>
  );
}
