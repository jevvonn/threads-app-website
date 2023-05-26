import Image from "next/image";
import TagItem from "../thread/addition/TagItem";
import { useSession } from "next-auth/react";

export default function UserInfo({ thread }) {
  const { data: session } = useSession();

  return (
    <div className="lg:w-4/12 flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="w-full hidden h-full border rounded lg:flex flex-col">
          <h2 className="w-full py-2 flex justify-center items-center bg-primary rounded-t font-semibold text-xl text-white">
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
            {thread.user.bio && <p>{thread.user.bio}</p>}
            {session && (
              <>
                <hr />
                <button className="w-11/12 mx-auto py-1 border border-primary rounded-full font-semibold text-xl text-primary hover:bg-primary hover:text-white transition">
                  Follow
                </button>
              </>
            )}
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-center  w-full  border">
          <h2 className="w-full bg-primary py-2 items-center rounded-t font-semibold flex justify-center text-xl text-white">
            Tags
          </h2>
          <div className="w-11/12 flex flex-wrap gap-1 py-4">
            {thread.tags.map((tag) => (
              <TagItem key={tag.name} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
