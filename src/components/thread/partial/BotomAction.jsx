import useMutationLike from "@/hooks/thread/useMutationLike";
import useMutationSave from "@/hooks/thread/useMutationSave";
import useMutationVote from "@/hooks/thread/useMutationVote";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

export default function BotomAction({ thread }) {
  const hasVotedUp = !!thread.votedUpBy?.length;
  const hasVotedDown = !!thread.votedDownBy?.length;
  const hasLiked = !!thread.likedBy?.length;
  const hasSaved = !!thread.savedBy?.length;

  const { handleLike } = useMutationLike(thread.id, thread.page);
  const { handleSave } = useMutationSave(thread.id, thread.page);
  const { handleVote } = useMutationVote(thread.id, thread.page);

  return (
    <div className="flex justify-end gap-3">
      <div className="md:hidden flex items-center text-primary">
        <button onClick={() => handleVote("vote_up", hasVotedUp, hasVotedDown)}>
          <IoCaretUpOutline
            className={hasVotedUp ? "animate-up-up" : ""}
            color={hasVotedUp ? "" : "gray"}
            size={27}
          />
        </button>
        <span className="w-10 text-center font-semibold text-black">
          {thread._count.votedUpBy - thread._count.votedDownBy}
        </span>
        <button
          onClick={() => handleVote("vote_down", hasVotedUp, hasVotedDown)}
        >
          <IoCaretDownOutline
            className={hasVotedDown ? "animate-down-down" : ""}
            color={hasVotedDown ? "" : "gray"}
            size={27}
          />
        </button>
      </div>
      <div className="flex items-center gap-1 font-semibold">
        <button onClick={() => handleLike(hasLiked)}>
          {hasLiked ? (
            <AiFillHeart
              className="animate-zoom-in-down"
              color="red"
              size={27}
            />
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
        <button onClick={() => handleSave(hasSaved)}>
          {hasSaved ? (
            <BsBookmarkFill
              className="animate-down-up"
              color="orange"
              size={25}
            />
          ) : (
            <BsBookmark size={25} />
          )}
        </button>
        <p>{thread._count.savedBy}</p>
      </div>
    </div>
  );
}
