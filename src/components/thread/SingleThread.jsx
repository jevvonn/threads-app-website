import relativeDateTime from "@/utils/relativeDateTime";
import Image from "next/image";
import Link from "next/link";
import SideVote from "./partial/SideVote";
import BottomAction from "./partial/BottomAction";
import BodyContent from "./partial/BodyContent";
import DropdownMore from "./partial/DropdownMore";

function SingleThread({ thread, needToCut = false, isLink = true }) {
  const timestamp = new Date(thread.createdAt).getTime();
  return (
    <div className="w-full flex">
      <SideVote thread={thread} />
      <div className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2 ">
        <div className="w-full flex gap-2 items-center">
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
          <div className="w-full">
            <span className="font-semibold">{thread.user.name}</span>
            <div className="flex gap-1 font-normal">
              {relativeDateTime(timestamp)}
            </div>
          </div>
          <div className="flex justify-end w-full">
            <DropdownMore thread={thread} />
          </div>
        </div>
        {isLink ? (
          <Link href={`/t/${thread.id}`} className="flex flex-col gap-2">
            <BodyContent thread={thread} needToCut={needToCut} />
          </Link>
        ) : (
          <BodyContent thread={thread} needToCut={needToCut} />
        )}
        <BottomAction thread={thread} />
      </div>
    </div>
  );
}

export default SingleThread;
