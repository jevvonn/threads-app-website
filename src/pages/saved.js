import Navbar from "@/components/navigation/Navbar";
import SingleThread from "@/components/thread/SingleThread";

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

export default function saved() {
  return (
    <>
      <Navbar />

      <div className="w-full lg:w-3/4 p-3 flex justify-center gap-3 mx-auto mt-16">
        <div className="w-full lg:w-4/6 flex flex-col items-end gap-3">
          <h1 className="w-full py-3 text-center text-3xl font-semibold">
            My <span className="text-primary">Saved</span> Post
          </h1>
          <SingleThread thread={thread} />
          <SingleThread thread={thread} />
          <SingleThread thread={thread} />
        </div>
      </div>
    </>
  );
}
