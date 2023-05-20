import FilterWidget from "@/components/navigation/FilterWidget";
import Navbar from "@/components/navigation/Navbar";
import SingleThread from "@/components/thread/SingleThread";
import { useState } from "react";
import { MdDone } from "react-icons/md";

const thread = {
  id: "clhsqqdj30004vn1oj3x97azr",
  userId: "clhkq6kxq0000mg08fx94wa5n",
  type: "POST_BODY",
  title: "Mang eakk ??",
  body: "<p>.....</p>",
  createdAt: "2023-05-18T06:18:19.263Z",
  updatedAt: "2023-05-18T06:18:19.263Z",
  likedBy: [
    {
      id: "clhf04djz0000vn78ndb6d9kr",
    },
    {
      id: "clhgco5kn0000v45cdf6pid1j",
    },
  ],
  savedBy: [
    {
      id: "clhf04djz0000vn78ndb6d9kr",
    },
  ],
  votedDownBy: [],
  votedUpBy: [
    {
      id: "clhf04djz0000vn78ndb6d9kr",
    },
    {
      id: "clhgco5kn0000v45cdf6pid1j",
    },
    {
      id: "clhkq6kxq0000mg08fx94wa5n",
    },
  ],
  tags: [
    {
      name: "ada aja",
    },
    {
      name: "baru aja",
    },
    {
      name: "buat baru",
    },
    {
      name: "greeting",
    },
  ],
  user: {
    id: "clhkq6kxq0000mg08fx94wa5n",
    name: "Annon",
    email: "darmawanb985@gmail.com",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxaPQIEzB9dVnH_H8GL34BaBeEQFsoVF50mcYU3h=s96-c",
    bio: "siapa aja boleh bro",
  },
  sources: [],
  _count: {
    comments: 0,
    likedBy: 2,
    savedBy: 1,
    votedDownBy: 0,
    votedUpBy: 3,
  },
};

export default function User() {
  const [followed, setFollow] = useState(false);

  return (
    <>
      <Navbar />
      <div className="w-full lg:w-3/4 py-3 flex gap-3 mx-auto mt-16">
        <div className="lg:w-8/12 w-full md:px-3 lg:px-0 flex flex-col items-end gap-3">
          <div className="w-full md:w-11/12 px-3 md:px-0 lg:h-32 flex gap-4 lg:items-center">
            <div className="w-24">
              <div className="avatar">
                <div className="w-24 rounded-full ring-2 ring-white">
                  <img
                    src="https://4kwallpapers.com/images/wallpapers/saitama-one-punch-man-2560x2560-10084.jpg"
                    alt="user-image"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 lg:gap-3">
              <span className="font-semibold text-xl">Saitama Kun</span>
              <div className="lg:hidden flex gap-2">
                <div className=" flex gap-2">
                  <span className="font-semibold">17</span>
                  <p>Following</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">5</span>
                  <p>Follower</p>
                </div>
              </div>
              {followed ? (
                <button
                  onClick={() => setFollow(false)}
                  className="md:w-1/2 border border-primary rounded text-primary flex justify-center items-center gap-1 text-lg transition"
                >
                  <MdDone />
                  <span>Following</span>
                </button>
              ) : (
                <button
                  onClick={() => setFollow(true)}
                  className="md:w-1/2 bg-primary rounded text-white flex justify-center items-center gap-1 text-lg transition"
                >
                  <span className="text-2xl font-medium">+</span>Follow
                </button>
              )}
            </div>
            <div className="hidden lg:flex divider divider-horizontal mx-0 items-end" />
          </div>
          <div className="flex flex-col w-full border-opacity-50"></div>
          <FilterWidget />
          <SingleThread thread={thread} />
        </div>
        <div className="hidden w-4/12 lg:flex flex-col gap-6">
          <div className="h-32 flex justify-center items-center font-semibold">
            <div className="w-2/6 flex flex-col items-center text-lg">
              <span>5</span>
              <p>Follower</p>
            </div>
            <div className="w-2/6 flex flex-col items-center text-lg">
              <span>17</span>
              <p>Following</p>
            </div>
          </div>
          <div className="w-full hidden border rounded lg:flex flex-col pb-10">
            <h2 className="w-full py-2 flex justify-center items-center bg-primary rounded-t font-semibold text-xl text-white">
              About Account
            </h2>
            <div className="px-4 py-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-12 rounded-full border">
                    <img
                      src="https://4kwallpapers.com/images/wallpapers/saitama-one-punch-man-2560x2560-10084.jpg"
                      alt="user-image"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
                <span className="font-semibold">Saitama Kun</span>
              </div>
              <p>Botak Person</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
