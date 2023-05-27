import Navbar from "@/components/navigation/Navbar";
import UserSkeleton from "@/components/skeleton/UserSkeleton";
import SingleThread from "@/components/thread/SingleThread";
import UserCard from "@/components/user/UserCard";
import useInfiniteUsers from "@/hooks/user/useInfiniteUsers";
import { useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

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

export default function search() {
  const { users, isFetching } = useInfiniteUsers(["users", "recommendation"]);
  const [content, setContent] = useState(1);

  return (
    <>
      <Navbar />

      <div className="lg:w-3/5 p-2 lg:pb-10 mx-auto mt-16">
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex">
            <button
              onClick={() => setContent(1)}
              className={
                content == 1
                  ? `activeTabStyle rounded-l font-semibold`
                  : `baseStyleTab rounded-l font-semibold`
              }
            >
              Threads
            </button>
            <button
              onClick={() => setContent(2)}
              className={
                content == 2
                  ? `activeTabStyle rounded-r font-semibold`
                  : `baseStyleTab rounded-r font-semibold`
              }
            >
              Users
            </button>
          </div>
          {content == 1 ? (
            <div className="flex flex-col gap-5">
              <SingleThread thread={thread} />
              <SingleThread thread={thread} />
              <SingleThread thread={thread} />
              <SingleThread thread={thread} />
            </div>
          ) : (
            <div className="w-full py-6 px-4 flex flex-col items-center gap-4 border rounded">
              <h2 className="font-semibold text-xl">Follow More thred'er</h2>
              <div className="w-14 h-14 flex justify-center items-center bg-secondary text-primary border rounded-full">
                <AiOutlineUsergroupAdd size={30} />
              </div>
              {users?.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
              {isFetching && <UserSkeleton total={5} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
