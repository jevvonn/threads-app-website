import relativeDateTime from "@/utils/relativeDateTime";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SideVote from "./partial/SideVote";
import BottomAction from "./partial/BottomAction";

function SingleThread({ thread, needToCut = false }) {
  const contentRef = useRef(null);
  const [needCut, setNeedCut] = useState(false);
  const timestamp = new Date(thread.createdAt).getTime();

  useEffect(() => {
    if (contentRef.current.clientHeight > 250 && needToCut) {
      setNeedCut(true);
    }
  }, [contentRef]);

  return (
    <div className="w-full flex">
      <SideVote thread={thread} />
      <div className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2 ">
        <div className="w-full flex gap-2">
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
          <div>
            <span className="font-semibold">{thread.user.name}</span>
            <div className="flex gap-1 font-normal">
              {relativeDateTime(timestamp)}
            </div>
          </div>
        </div>
        <Link href={`/t/${thread.id}`} className="flex flex-col gap-2">
          <h3 className="font-semibold text-xl">{thread.title}</h3>
          {thread.type == "POST_SOURCE" &&
            thread.sources.map((src) => (
              <Image key={src.id} src={src.url} className="w-full" />
            ))}
          {thread.type == "POST_BODY" && (
            <div
              ref={contentRef}
              className={`w-full relative ${
                needCut ? "cute-content" : ""
              } prose prose-base prose-img:m-0 prose-img:rounded`}
              dangerouslySetInnerHTML={{ __html: thread.body }}
            />
          )}
        </Link>
        <BottomAction thread={thread} />
      </div>
    </div>
  );
}

export default SingleThread;
