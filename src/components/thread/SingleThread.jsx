import relativeDateTime from "@/utils/relativeDateTime";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

function SingleThread({ thread }) {
  const contentRef = useRef(null);
  const [needCut, setNeedCut] = useState(false);
  const timestamp = new Date(thread.createdAt).getTime();

  useEffect(() => {
    if (contentRef.current.clientHeight > 250) {
      setNeedCut(true);
    }
  }, []);

  return (
    <div className="w-full flex">
      <div className="w-1/12 hidden md:flex flex-col  items-center text-primary">
        <button>
          <IoCaretUpOutline
            size={35}
            color={!thread.votedUpBy?.length ? "gray" : ""}
            className="hidden md:block"
          />
        </button>
        <span className="font-semibold text-black">
          {thread._count.votedUpBy - thread._count.votedDownBy}
        </span>
        <button>
          <IoCaretDownOutline
            size={35}
            color={!thread.votedDownBy?.length ? "gray" : ""}
            className="hidden md:block"
          />
        </button>
      </div>

      <div className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2 ">
        <Link href={`/t/${thread.id}`} className="flex flex-col gap-2">
          <Link
            href={`/u/${thread.user.id}`}
            className="group w-full flex gap-2"
          >
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
              <span className="group-hover:underline font-semibold">
                {thread.user.name}
              </span>
              <div className="flex gap-1 font-normal">
                {relativeDateTime(timestamp)}
              </div>
            </div>
          </Link>
          <h3 className="font-semibold text-xl">{thread.title}</h3>
          {thread.type == "POST_SOURCE" &&
            thread.sources.map((src) => (
              <img src={src.url} className="w-full" />
            ))}
          {thread.type == "POST_BODY" && (
            <div
              ref={contentRef}
              className={`w-full relative ${
                needCut ? "cute-content" : ""
              } prose prose-base`}
              dangerouslySetInnerHTML={{ __html: thread.body }}
            />
          )}
        </Link>
        <div className="flex justify-end gap-3">
          <div className="md:hidden flex items-center text-primary">
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
          <div className="flex items-center gap-1 font-semibold">
            <button>
              {!!thread.likedBy?.length ? (
                <AiFillHeart color="red" size={27} />
              ) : (
                <AiOutlineHeart size={27} />
              )}
            </button>
            <p>{thread._count.likedBy}</p>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <button>
              <AiOutlineComment size={27} />
            </button>
            <p>{thread._count.comments}</p>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <button>
              {!!thread.savedBy?.length ? (
                <BsBookmarkFill color="orange" size={27} />
              ) : (
                <BsBookmark size={25} />
              )}
            </button>
            <p>{thread._count.savedBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleThread;
