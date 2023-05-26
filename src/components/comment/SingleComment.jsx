import usePaginateReply from "@/hooks/comment/usePaginateReply";
import relativeDateTime from "@/utils/relativeDateTime";
import Image from "next/image";
import { LoaderIcon } from "react-hot-toast";
import {
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

export default function SingleComment({ comment, thread }) {
  const timestamp = new Date(comment.createdAt).getTime();
  const {
    comments,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetching: replyLoading,
  } = usePaginateReply(thread.id, comment.id, [
    "comments",
    { threadId: thread.id, parentId: comment.id },
  ]);

  return (
    <>
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
              <label
                htmlFor={`comment-model-${comment.id}`}
                className="btn btn-sm rounded bg-transparent border-none text-black capitalize hover:bg-zinc-400"
              >
                Reply
              </label>
            </div>
          </div>
          <div>
            {comment.parentId == null &&
              comment._count.childrens > 0 &&
              !comments?.length && (
                <button
                  onClick={refetch}
                  className="flex items-center gap-2 hover:underline"
                >
                  {replyLoading ? (
                    <AiOutlineLoading3Quarters
                      size={25}
                      className="animate-spin"
                    />
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

      <>
        <input
          type="checkbox"
          id={`comment-model-${comment.id}`}
          className="modal-toggle"
        />
        <label
          htmlFor={`comment-model-${comment.id}`}
          className="modal cursor-pointer"
        >
          <label
            className="modal-box max-w-xl p-4 absolute top-9 flex flex-col gap-2"
            htmlFor={`comment-model-${comment.id}`}
          >
            <label
              htmlFor={`comment-model-${comment.id}`}
              className="btn btn-sm w-9 h-9 btn-circle absolute left-2 top-2 bg-transparent text-black text-base border-none hover:bg-zinc-200"
            >
              ✕
            </label>
            <div className="mt-12 flex flex-col gap-5">
              <div className="w-full flex gap-2">
                <div className="w-14">
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
                </div>
                <div className="flex flex-col">
                  <span className="group-hover:underline font-semibold">
                    {thread.user.name}
                  </span>
                  <p className="flex gap-1">
                    <span>Replying to</span>
                    <span className="text-blue-400">{thread.user.name}</span>
                  </p>
                </div>
              </div>
              <div className="w-full flex gap-1">
                <div className="w-14">
                  <div className="avatar">
                    <div className="w-12 rounded-full border">
                      <img
                        src="https://4kwallpapers.com/images/wallpapers/saitama-one-punch-man-2560x2560-10084.jpg"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                </div>
                <textarea
                  className="w-full mt-2 textarea textarea-bordered h-36 resize-none focus:outline-none text-lg"
                  placeholder="Express your reply"
                ></textarea>
              </div>
            </div>
            <div className=" flex justify-end">
              <button className="px-4 py-2 bg-primary text-sm text-white font-semibold capitalize tracking-wider rounded-full border-2 border-primary hover:bg-[#554f95] transition">
                Reply
              </button>
            </div>
          </label>
        </label>
      </>

      {comments?.map((replyComment, idx) => (
        <>
          <SingleComment
            comment={replyComment}
            key={replyComment.id}
            thread={thread}
          />
          {idx == comments.length - 1 && hasNextPage && (
            <button
              onClick={fetchNextPage}
              className="flex items-center gap-2 hover:underline ml-12"
            >
              {replyLoading ? (
                <AiOutlineLoading3Quarters size={25} className="animate-spin" />
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
    </>
  );
}
