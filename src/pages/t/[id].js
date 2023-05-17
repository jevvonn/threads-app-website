import Navbar from "@/components/navigation/Navbar";
import SingleThread from "@/components/thread/SingleThread";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsShareFill } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import useSingleThread from "@/hooks/thread/useSingleThread";
import { useRouter } from "next/router";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";
import UserInfo from "@/components/user/UserInfo";
import Head from "next/head";
import Link from "next/link";

export default function Thread() {
  const router = useRouter();
  const { id } = router.query;
  const { thread, isLoading } = useSingleThread(id);

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
              <SingleThread thread={thread} />
              <div className="w-full md:w-11/12 flex flex-col gap-3">
                <div className="lg:hidden flex flex-col items-center gap-5 w-full py-4 border">
                  <div className="w-11/12 flex flex-wrap gap-1">
                    <div className="badge badge-ghost">Adventure</div>
                    <div className="badge badge-ghost">Scifi</div>
                    <div className="badge badge-ghost">Drama</div>
                    <div className="badge badge-ghost">Slice of Life</div>
                    <div className="badge badge-ghost">Horror</div>
                    <div className="badge badge-ghost">School</div>
                    <div className="badge badge-ghost">Musical</div>
                    <div className="badge badge-ghost">Fantasy</div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <span className="font-semibold">Comment as Xooos</span>
                  <textarea
                    className="textarea textarea-bordered h-36 resize-none focus:outline-none text-lg"
                    placeholder="what are you thoughts?"
                  ></textarea>
                </div>
                <hr />
                <div>
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-12 rounded-full border">
                        <img
                          src="https://mediapublica.co/wp-content/uploads/2015/01/Mr_beans_holiday_ver2.jpg"
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>
                    <span className="font-semibold">Dessert_Fox69</span>
                    <p>2 mnt.ago</p>
                  </div>
                  <div className="ml-14">
                    <p className="text-lg">
                      Click 88 if you love Lampung street
                    </p>
                    <div className="flex gap-3">
                      <div className="flex items-center text-primary">
                        <button>
                          <IoCaretUpOutline size={27} />
                        </button>
                        <span className="w-10 text-center font-semibold text-black">
                          {/* {thread._count.votedUpBy - thread._count.votedDownBy} */}
                          200
                        </span>
                        <button>
                          <IoCaretDownOutline
                            // color={!thread.votedDownBy?.length ? "gray" : ""}
                            size={27}
                          />
                        </button>
                      </div>
                      <button className="px-5 focus:bg-zinc-400">Reply</button>
                      <div className="dropdown dropdown-bottom dropdown-end my-auto w-7 h-7 hover:bg-zinc-400">
                        <label
                          tabIndex={0}
                          className="w-7 h-7 flex justify-center items-center cursor-pointer"
                        >
                          <FiMoreHorizontal size={25} />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content border menu p-2 shadow bg-base-100 rounded"
                        >
                          <li>
                            <a>
                              <BsShareFill />
                              Share
                            </a>
                          </li>
                          <li>
                            <a>
                              <HiUserAdd />
                              Follow
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <div className="avatar">
                          <div className="w-12 rounded-full border">
                            <img
                              src="https://4kwallpapers.com/images/wallpapers/saitama-one-punch-man-2560x2560-10084.jpg"
                              width={50}
                              height={50}
                            />
                          </div>
                        </div>
                        <span className="font-semibold">Bald Golds</span>
                        <p>1 mnt.ago</p>
                      </div>
                      <div className="ml-14">
                        <p className="text-lg">Terimakasih Orang Baik</p>
                        <div className="flex gap-3">
                          <div className="flex items-center text-primary">
                            <button>
                              <IoCaretUpOutline
                                // color={!thread.votedUpBy?.length ? "gray" : ""}
                                size={27}
                              />
                            </button>
                            <span className="w-10 text-center font-semibold text-black">
                              {/* {thread._count.votedUpBy - thread._count.votedDownBy} */}
                              200
                            </span>
                            <button>
                              <IoCaretDownOutline
                                // color={!thread.votedDownBy?.length ? "gray" : ""}
                                size={27}
                              />
                            </button>
                          </div>
                          <button className="px-5 focus:bg-zinc-400">
                            Reply
                          </button>
                          <div className="dropdown dropdown-bottom dropdown-end my-auto w-7 h-7 hover:bg-zinc-400">
                            <label
                              tabIndex={0}
                              className="w-7 h-7 flex justify-center items-center cursor-pointer"
                            >
                              <FiMoreHorizontal size={25} />
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content shadow border menu p-2 bg-base-100 rounded"
                            >
                              <li>
                                <a>
                                  <BsShareFill />
                                  Share
                                </a>
                              </li>
                              <li>
                                <a>
                                  <HiUserAdd />
                                  Follow
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <textarea
                          className="w-full mt-2 textarea textarea-bordered h-36 resize-none focus:outline-none text-lg"
                          placeholder="what are you thoughts?"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {thread && <UserInfo thread={thread} />}
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
