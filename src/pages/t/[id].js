import Navbar from "@/components/navigation/Navbar";
import SingleThread from "@/components/thread/SingleThread";
import Image from "next/image";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsShareFill } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";

const thread = {
  id: "clhh1ihff0002unr0fl1qjnja",
  userId: "clhgco5kn0000v45cdf6pid1j",
  type: "POST_BODY",
  title: "Next.js App Router",
  body: "These APIs made it more clear where your code was running, either the client or server, and allowed Next.js applications to be automatically statically optimized. Further, it allowed for static exports, enabling Next.js to be deployed to places that don't support a server (e.g. AWS S3 bucket).  However, this was not “just JavaScript”, and we wanted to adhere closer to our original design principle.  Since Next.js was created, we've worked closely with the React core team at Meta to build framework features on top of React primitives. Our partnership, in combination with the years of research and development from the React core team, has led to an opportunity for Next.js to achieve our goals through the latest version of the React architecture, including Server Components.  With the App Router, you fetch data using the familiar async and await syntax. There are no new APIs to learn. By default, all components are React Server Components, so data fetching happens securely on the server. For example:",
  isDraft: false,
  categoryId: null,
  createdAt: "2023-05-10T01:46:52.731Z",
  updatedAt: "2023-05-10T01:46:23.882Z",
  likedBy: [],
  savedBy: [],
  votedDownBy: [],
  votedUpBy: [],
  tags: [],
  user: {
    id: "clhgco5kn0000v45cdf6pid1j",
    name: "Vidi Fadhil Arofah",
    email: "fadil.arofah79@gmail.com",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxZAAAKpeKamBtCi2gcE9tE0biYpY8Z4Z2jEOfCI=s96-c",
    bio: "Pelajar",
  },
  sources: [],
  category: null,
  _count: {
    comments: 0,
    likedBy: 0,
    savedBy: 0,
    votedDownBy: 0,
    votedUpBy: 0,
  },
};

export default function Thread() {
  return (
    <>
      <Navbar />

      <div className="md:w-11/12 lg:gap-3 flex p-3 mt-16 mx-auto">
        <div className="w-full lg:w-8/12 flex flex-col items-end gap-3">
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
                <p className="text-lg">Click 88 if you love Lampung street</p>
                <div className="flex gap-3">
                  <div className="flex items-center text-primary">
                    <button>
                      <IoCaretUpOutline
                        color={!thread.votedUpBy?.length ? "gray" : ""}
                        size={27}
                      />
                    </button>
                    <span className="w-10 text-center font-semibold text-black">
                      {thread._count.votedUpBy - thread._count.votedDownBy}
                    </span>
                    <button>
                      <IoCaretDownOutline
                        color={!thread.votedDownBy?.length ? "gray" : ""}
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
                      className="dropdown-content shadow border menu p-2 shadow bg-base-100 rounded"
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
                            color={!thread.votedUpBy?.length ? "gray" : ""}
                            size={27}
                          />
                        </button>
                        <span className="w-10 text-center font-semibold text-black">
                          {thread._count.votedUpBy - thread._count.votedDownBy}
                        </span>
                        <button>
                          <IoCaretDownOutline
                            color={!thread.votedDownBy?.length ? "gray" : ""}
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
                          className="dropdown-content shadow border menu p-2 shadow bg-base-100 rounded"
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
        </div>
        <div className="lg:w-4/12 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="w-full hidden h-full border rounded lg:flex flex-col">
              <h2 className="w-full h-12 flex justify-center items-center bg-primary rounded-t font-semibold text-xl text-white">
                About Account
              </h2>
              <div className="px-4 py-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full border">
                      <Image
                        src={thread.user.image}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <span className="font-semibold">{thread.user.name}</span>
                </div>
                <p>{thread.user.bio}</p>
                <hr />
                <button className="w-11/12 mx-auto py-1 border border-primary rounded-full font-semibold text-xl text-primary">
                  Follow
                </button>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-5 w-full py-4 border">
              <h2 className="text-xl font-semibold">Tags</h2>
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
          </div>
        </div>
      </div>
    </>
  );
}
