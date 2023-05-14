import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

export default function BotomAction({ thread, handleVote }) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const hasVotedUp = !!thread.votedUpBy?.length;
  const hasVotedDown = !!thread.votedDownBy?.length;
  const hasLiked = !!thread.likedBy?.length;
  const hasSaved = !!thread.savedBy?.length;

  const { mutate: mutateLike } = useMutation(
    async ({ hasLiked }) => {
      const { data } = await axios.post("/api/thread/action/like", {
        id: thread.id,
        hasLiked,
      });
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["threads"], {
          refetchPage: (_, index) => index === thread.page,
        });
        toast.success(() => (
          <b>{`You ${hasLiked ? "unliked" : "liked"} the thred's !`}</b>
        ));
      },
    }
  );

  const { mutate: mutateSave } = useMutation(
    async ({ hasSaved }) => {
      const { data } = await axios.post("/api/thread/action/save", {
        id: thread.id,
        hasSaved,
      });
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["threads"], {
          refetchPage: (_, index) => index === thread.page,
        });
        toast.success(() => (
          <b>{`You ${hasSaved ? "unsave" : "save"} the thred's !`}</b>
        ));
      },
    }
  );

  const handleLike = () => {
    if (!session) {
      toast.error(() => <b>Please login first!</b>);
      return;
    }

    mutateLike({ hasLiked });
  };

  const handleSave = () => {
    if (!session) {
      toast.error(() => <b>Please login first!</b>);
      return;
    }

    mutateSave({ hasSaved });
  };

  return (
    <div className="flex justify-end gap-3">
      <div className="md:hidden flex items-center text-primary">
        <button onClick={() => handleVote("vote_up")}>
          <IoCaretUpOutline color={hasVotedUp ? "" : "gray"} size={27} />
        </button>
        <span className="w-10 text-center font-semibold text-black">
          {thread._count.votedUpBy - thread._count.votedDownBy}
        </span>
        <button onClick={() => handleVote("vote_down")}>
          <IoCaretDownOutline color={hasVotedDown ? "" : "gray"} size={27} />
        </button>
      </div>
      <div className="flex items-center gap-1 font-semibold">
        <button onClick={handleLike}>
          {hasLiked ? (
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
        <button onClick={handleSave}>
          {hasSaved ? (
            <BsBookmarkFill color="orange" size={25} />
          ) : (
            <BsBookmark size={25} />
          )}
        </button>
        <p>{thread._count.savedBy}</p>
      </div>
    </div>
  );
}
