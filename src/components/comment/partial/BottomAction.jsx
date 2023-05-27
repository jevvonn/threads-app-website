import AlertToast from "@/components/toast/AlertToast";
import useLikeComment from "@/hooks/comment/useLikeComment";
import useVoteComment from "@/hooks/comment/useVoteComment";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import DropdownMoreComment from "./DropdownMore";

export default function BottomActionComment({ comment, thread, parentPage }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const hasVotedUp = !!comment.votedUpBy?.length;
  const hasVotedDown = !!comment.votedDownBy?.length;
  const hasLiked = !!comment.likedBy?.length;

  const { mutateVote } = useVoteComment(comment.id);
  const { mutateLike } = useLikeComment(comment.id);

  const handleVote = (voteType) => {
    if (!session) {
      return toast.custom(
        () => (
          <AlertToast text={`Login to vote this Thred's!`} isSuccess={false} />
        ),
        { position: "top-center" }
      );
    }

    const data = {
      hasVoted: hasVotedUp || hasVotedDown ? true : false,
      hasVotedType: hasVotedUp ? "voted_up" : "voted_down",
      voteType,
    };

    mutateVote(data, {
      onSuccess: async () => {
        if (!comment.parentId) {
          await queryClient.invalidateQueries(
            ["comments", { threadId: thread.id }],
            {
              refetchPage: (_, idx) =>
                idx === (parentPage ? parentPage : comment.page),
            }
          );
        }
        await queryClient.invalidateQueries(
          [
            "comments",
            { parentId: comment.parentId ? comment.parentId : comment.id },
          ],
          {
            refetchPage: (_, idx) => idx === 0,
          }
        );
        toast.custom(
          () => <AlertToast text={`Your vote has been recorded.`} />,
          { position: "top-center", id: "action-notification" }
        );
      },
    });
  };

  const handleLike = () => {
    if (!session) {
      return toast.custom(
        () => (
          <AlertToast text={`Login to likes this Thred's!`} isSuccess={false} />
        ),
        { position: "top-center" }
      );
    }

    mutateLike(
      { hasLiked },
      {
        onSuccess: async () => {
          if (!comment.parentId) {
            await queryClient.invalidateQueries(
              ["comments", { threadId: thread.id }],
              {
                refetchPage: (_, idx) =>
                  idx === (parentPage ? parentPage : comment.page),
              }
            );
          }
          await queryClient.invalidateQueries(
            [
              "comments",
              { parentId: comment.parentId ? comment.parentId : comment.id },
            ],
            {
              refetchPage: (_, idx) => idx === 0,
            }
          );
          toast.custom(
            () => <AlertToast text={`Your like has been recorded.`} />,
            { position: "top-center", id: "action-notification" }
          );
        },
      }
    );
  };

  return (
    <div className="flex gap-2">
      <div className="flex items-center font-semibold text-primary">
        <button onClick={() => handleVote("vote_up")}>
          <IoCaretUpOutline
            className={hasVotedUp ? "animate-up-up" : ""}
            color={hasVotedUp ? "" : "gray"}
            size={27}
          />
        </button>
        <span className="w-10 text-center font-semibold text-black">
          {comment._count.votedUpBy - comment._count.votedDownBy}
        </span>
        <button onClick={() => handleVote("vote_down")}>
          <IoCaretDownOutline
            className={hasVotedDown ? "animate-down-down" : ""}
            color={hasVotedDown ? "" : "gray"}
            size={27}
          />
        </button>
      </div>
      <div className="flex items-center font-semibold">
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
