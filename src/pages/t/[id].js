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
import Image from "next/image";
import TagItem from "@/components/thread/addition/TagItem";
import { useSession } from "next-auth/react";
import CommentForm from "@/components/comment/create/CommentForm";

export default function Thread() {
  const router = useRouter();
  const { id } = router.query;
  const { thread, isLoading } = useSingleThread(id);
  const { data: session } = useSession();

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
                      <TagItem tag={tag} />
                    ))}
                  </div>
                </div>
                {session && <CommentForm thread={thread} />}
                {/* <hr />
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
                          200
                        </span>
                        <button>
                          <IoCaretDownOutline
                            size={27}
                          />
                        </button>
                      </div>
                      <div>
                        <label
                          htmlFor="my-modal-4"
                          className="btn btn-sm rounded bg-transparent border-none text-black capitalize hover:bg-zinc-400"
                        >
                          Reply
                        </label>
                        <input
                          type="checkbox"
                          id="my-modal-4"
                          className="modal-toggle"
                        />
                        <label
                          htmlFor="my-modal-4"
                          className="modal cursor-pointer"
                        >
                          <label
                            className="modal-box max-w-xl p-4 absolute top-9 flex flex-col gap-2"
                            htmlFor=""
                          >
                            <label
                              htmlFor="my-modal-4"
                              className="btn btn-sm w-9 h-9 btn-circle absolute left-2 top-2 bg-transparent text-black text-base border-none hover:bg-zinc-200"
                            >
                              ✕
                            </label>
                            <div className="mt-12 flex flex-col gap-5">
                              <div className="w-full flex gap-2">
                                <div class="w-14">
                                  <div className="avatar">
                                    <div className="w-12 rounded-full border">
                                      <Image
                                        src={thread.user.image}
                                        alt={thread.user.name}
                                        width={50}
                                        height={50}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <span className="group-hover:underline font-semibold">
                                    {thread.user.name}
                                  </span>
                                  <p className="flex gap-1">
                                    <span>Replying to</span>
                                    <span className="text-blue-400">
                                      {thread.user.name}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="w-full flex gap-1">
                                <div className="w-14">
                                  <div className="avatar">
                                    <div className="w-12 rounded-full border">
                                      <img
                                        src="https://4kwallpapers.com/images/wallpapers/saitama-one-punch-man-2560x2560-10084.jpg"
                                        width={50}
                                        height={50}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <textarea
                                  className="w-full mt-2 textarea textarea-bordered h-36 resize-none focus:outline-none text-lg"
                                  placeholder="Express your reply"
                                ></textarea>
                              </div>
                            </div>
                            <div className=" flex justify-end">
                              <button className="px-4 py-2 bg-primary text-sm text-white font-semibold capitalize tracking-wider rounded-full border-2 border-primary hover:bg-[#554f95] transition">
                                Reply
                              </button>
                            </div>
                          </label>
                        </label>
                      </div>
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
                                size={27}
                              />
                            </button>
                            <span className="w-10 text-center font-semibold text-black">
                              200
                            </span>
                            <button>
                              <IoCaretDownOutline
                                size={27}
                              />
                            </button>
                          </div>
                          <div>
                            <label
                              htmlFor="my-modal-4"
                              className="btn btn-sm rounded bg-transparent border-none text-black capitalize hover:bg-zinc-400"
                            >
                              Reply
                            </label>
                            <input
                              type="checkbox"
                              id="my-modal-4"
                              className="modal-toggle"
                            />
                            <label
                              htmlFor="my-modal-4"
                              className="modal cursor-pointer"
                            >
                              <label
                                className="modal-box max-w-xl p-4 absolute top-9 flex flex-col gap-2"
                                htmlFor=""
                              >
                                <label
                                  htmlFor="my-modal-4"
                                  className="btn btn-sm w-9 h-9 btn-circle absolute left-2 top-2 bg-transparent text-black text-base border-none hover:bg-zinc-200"
                                >
                                  ✕
                                </label>
                                <div className="mt-12 flex flex-col gap-5">
                                  <div className="w-full flex gap-2">
                                    <div class="w-14">
                                      <div className="avatar">
                                        <div className="w-12 rounded-full border">
                                          <Image
                                            src={thread.user.image}
                                            alt={thread.user.name}
                                            width={50}
                                            height={50}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="group-hover:underline font-semibold">
                                        {thread.user.name}
                                      </span>
                                      <p className="flex gap-1">
                                        <span>Replying to</span>
                                        <span className="text-blue-400">
                                          {thread.user.name}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full flex gap-1">
                                    <div className="w-14">
                                      <div className="avatar">
                                        <div className="w-12 rounded-full border">
                                          <img
                                            src="https://4kwallpapers.com/images/wallpapers/saitama-one-punch-man-2560x2560-10084.jpg"
                                            width={50}
                                            height={50}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <textarea
                                      className="w-full mt-2 textarea textarea-bordered h-36 resize-none focus:outline-none text-lg"
                                      placeholder="Express your reply"
                                    ></textarea>
                                  </div>
                                </div>
                                <div className=" flex justify-end">
                                  <button className="px-4 py-2 bg-primary text-sm text-white font-semibold capitalize tracking-wider rounded-full border-2 border-primary hover:bg-[#554f95] transition">
                                    Reply
                                  </button>
                                </div>
                              </label>
                            </label>
                          </div>
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
                      </div>
                    </div>
                  </div>
                </div> */}
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
