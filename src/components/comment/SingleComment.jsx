import usePaginateReply from "@/hooks/comment/usePaginateReply";
import relativeDateTime from "@/utils/relativeDateTime";
import Image from "next/image";
import { AiOutlineDown, AiOutlineHeart } from "react-icons/ai";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import ReplyModal from "./create/ReplyModal";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SingleComment({ comment, thread, parentPage = null }) {
  const timestamp = new Date(comment.createdAt).getTime();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const {
    comments,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetching: replyLoading,
  } = usePaginateReply(
    thread.id,
    comment.id,
    ["comments", { parentId: comment.id }],
    open
  );

  return (
    <div>
      <div className={`flex gap-2 ${comment.parentId != null && "ml-12"}`}>
        <div>
          <div className="avatar">
            <div className="w-12 rounded-full border">
              <Image
                src={comment.user.image}
                alt={comment.user.name}
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold">
              {comment.user.name}{" "}
              {comment.repliedTo && (
                <>
                  <span className="text-sm text-slate-500 group cursor-pointer">
                    <span className="text-xs">Reply To</span>{" "}
                    <span className="group-hover:underline">
                      {comment.repliedTo.user.name}
                    </span>
                  </span>{" "}
                </>
              )}
            </span>
            <p>{relativeDateTime(timestamp)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className=" whitespace-pre-wrap">{comment.body}</p>
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
          </div>
          <div>
            {comment.parentId == null &&
              comment._count.childrens > 0 &&
              !comments?.length && (
                <button
                  onClick={() => setOpen(true)}
                  className="flex items-center gap-2 hover:underline"
                >
                  {replyLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span>Show Replies</span> <AiOutlineDown />
                    </>
                  )}
                </button>
              )}
          </div>
        </div>
      </div>

      {session && (
        <ReplyModal comment={comment} thread={thread} parentPage={parentPage} />
      )}
      {comments?.map((replyComment, idx) => (
        <>
          <SingleComment
            comment={replyComment}
            key={replyComment.id}
            parentPage={comment.page}
            thread={thread}
          />
          {idx == comments.length - 1 && hasNextPage && (
            <button
              onClick={fetchNextPage}
              className="flex items-center gap-2 hover:underline ml-12"
            >
              {replyLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <span>
                    Other Replies ({comment._count.childrens - comments.length})
                  </span>{" "}
                  <AiOutlineDown />
                </>
              )}
            </button>
          )}
        </>
      ))}
    </div>
  );
}
