import { useSession } from "next-auth/react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

export default function BottomActionComment({ comment, thread }) {
  const { data: session } = useSession();
  const hasVotedUp = !!comment.votedUpBy?.length;
  const hasVotedDown = !!comment.votedDownBy?.length;
  const hasLiked = !!comment.likedBy?.length;

  return (
    <div className="flex gap-2">
      <div className="flex items-center font-semibold">
        <button>
          <IoCaretUpOutline size={27} />
        </button>
        <span className="w-10 text-center font-semibold text-black">
          {comment._count.votedUpBy - comment._count.votedDownBy}
        </span>
        <button>
          <IoCaretDownOutline size={27} />
        </button>
      </div>
      <div className="flex items-center font-semibold">
        <button>
          <AiOutlineHeart size={27} />
        </button>
        <span className="w-6 text-center font-semibold text-black">
          {comment._count.likedBy}
        </span>
      </div>
      {session && (
        <label
          htmlFor={`comment-modal-${comment.id}`}
          className="btn btn-sm rounded bg-transparent border-none text-black capitalize hover:bg-zinc-400"
        >
          Reply
        </label>
      )}
    </div>
  );
}
