import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

function SingleThread({ thread }) {
  return (
    <div className="w-full flex">
      <div className="w-1/12 hidden md:flex flex-col  items-center text-primary">
        <button>
          <IoCaretUpOutline
            size={35}
            color="gray"
            className="hidden md:block"
          />
        </button>
        <span className="font-semibold text-black">
          {thread._count.vote_up - thread._count.vote_down}
        </span>
        <button>
          <IoCaretDownOutline
            size={35}
            color="gray"
            className="hidden md:block"
          />
        </button>
      </div>
      <Link
        href=""
        className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2"
      >
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
          <div className="">
            <span className="font-semibold">{thread.user.name}</span>
            <div className="flex gap-1">
              {/* <p>Dirjen***</p> */}
              <span>uploaded 5 minutes ago</span>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-xl">{thread.title}</h3>
        {thread.type == "POST_SOURCE" &&
          thread.source.map((src) => <img src={src.url} className="w-full" />)}
        {thread.type == "POST_BODY" && (
          <p
            className="w-full relative line-clamp-[12] before:content-[''] before:w-full before:h-20 before:absolute before:bottom-0 before:bg-gradient-to-b from-transparent to-white"
            dangerouslySetInnerHTML={{ __html: thread.body }}
          />
        )}
        <div className="flex justify-end gap-3">
          <div className="md:hidden flex items-center text-primary">
            <button>
              <IoCaretUpOutline size={27} />
            </button>
            <span className="w-10 text-center font-semibold text-black">
              20.k
            </span>
            <button>
              <IoCaretDownOutline size={27} />
            </button>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <button>
              <AiOutlineHeart size={27} />
            </button>
            <p>25.4k</p>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <button>
              <AiOutlineComment size={27} />
            </button>
            <p>120k</p>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <button>
              <BsBookmark size={25} />
            </button>
            <p>5k</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SingleThread;
