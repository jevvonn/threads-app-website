import usePaginateReply from "@/hooks/comment/usePaginateReply";
import relativeDateTime from "@/utils/relativeDateTime";
import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";
import ReplyModal from "./create/ReplyModal";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BottomActionComment from "./partial/BottomAction";
import { useQueryClient } from "@tanstack/react-query";
import DropdownMoreComment from "./partial/DropdownMore";

export default function SingleComment({ comment, thread, parentPage = null }) {
  const timestamp = new Date(comment.createdAt).getTime();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const {
    comments,
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
    <>
      <div className={`flex mt-2 border p-2 gap-2 rounded w-full`}>
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
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full">
            <div className="w-full">
              <span className="font-semibold">
                {comment.user.name}{" "}
                {comment.repliedTo && (
                  <>
                    <span className="text-sm text-slate-500 group cursor-pointer">
                      <span className="text-xs">Reply to</span>{" "}
                      <span className="group-hover:underline">
                        {comment.repliedTo.user.name}
                      </span>
                    </span>
                  </>
                )}
              </span>
              <p>{relativeDateTime(timestamp)}</p>
            </div>
            {session?.user?.id === comment.user.id && (
              <div className="flex w-full justify-end">
                <DropdownMoreComment
                  comment={comment}
                  thread={thread}
                  parentPage={parentPage}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className=" whitespace-pre-wrap break-all">{comment.body}</p>
            <BottomActionComment
              parentPage={parentPage}
              comment={comment}
              thread={thread}
            />
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
      {comments && (
        <div className="flex">
          <div className="flex justify-end w-6">
            <div className="h-full border border-slate-300" />
          </div>
          <div className="w-full flex flex-col gap-2 py-2">
            {comments.map((replyComment, idx) => (
              <div key={replyComment.id}>
                <div className="flex items-center w-full">
                  <div className="w-4 border border-slate-300" />
                  <SingleComment
                    comment={replyComment}
                    key={replyComment.id}
                    parentPage={comment.page}
                    thread={thread}
                  />
                </div>
                {idx == comments.length - 1 && hasNextPage && (
                  <button
                    onClick={fetchNextPage}
                    className="flex items-center gap-2 hover:underline ml-4"
                  >
                    {replyLoading ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <span>
                          Other Replies (
                          {comment._count.childrens - comments.length})
                        </span>{" "}
                        <AiOutlineDown />
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {session && (
        <ReplyModal comment={comment} thread={thread} parentPage={parentPage} />
      )}
    </>
  );
}
