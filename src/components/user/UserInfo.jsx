import Image from "next/image";
import Link from "next/link";

export default function UserInfo({ thread }) {
  return (
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
            {thread.tags.map((tag) => (
              <Link
                href={`/tags?q=${tag.name}`}
                className="badge badge-ghost font-semibold badge-lg"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
