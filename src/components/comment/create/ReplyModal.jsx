import AlertToast from "@/components/toast/AlertToast";
import useCreateComment from "@/hooks/comment/useCreateComment";
import { useQueryClient } from "@tanstack/react-query";
import autosize from "autosize";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function ReplyModal({ comment, thread, parentPage }) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [body, setBody] = useState(``);
  const modalCloseRef = useRef(null);
  const { mutateCreateComment, isLoading } = useCreateComment();

  const handleSubmit = () => {
    if (!body || body == "")
      return toast.custom((t) => (
        <AlertToast t={t} isSuccess={false} text={"Please fill your content"} />
      ));

    mutateCreateComment(
      {
        threadId: thread.id,
        parentId: comment.parentId ? comment.parentId : comment.id,
        repliedToId: comment.parentId ? comment.id : null,
        body,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(
            ["comments", { threadId: thread.id }],
            {
              refetchPage: (_, idx) =>
                idx === (parentPage ? parentPage : comment.page),
            }
          );
          await queryClient.invalidateQueries(
            [
              "comments",
              { parentId: comment.parentId ? comment.parentId : comment.id },
            ],
            {
              refetchPage: (_, idx) => idx === 0,
            }
          );
          setBody(``);
          modalCloseRef.current.click();
          toast.custom(
            (t) => <AlertToast t={t} text={`Your comment has been added!`} />,
            { position: "top-center", id: "action-notification" }
          );
        },
      }
    );
  };

  return (
    <>
      <input
        type="checkbox"
        id={`comment-modal-${comment.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-xl p-4 absolute top-9 flex flex-col gap-2">
          <label
            htmlFor={`comment-modal-${comment.id}`}
            ref={modalCloseRef}
            className="btn btn-sm w-9 h-9 btn-circle absolute left-2 top-2 bg-transparent text-black text-base border-none hover:bg-zinc-200"
          >
            ✕
          </label>
          <div className="mt-12 flex flex-col">
            <div className="w-full flex gap-2">
              <div className="w-14">
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
                <div className="h-12 flex flex-col justify-center">
                  <span className="group-hover:underline font-semibold">
                    {comment.user.name}
                  </span>
                  <p className="flex gap-1">
                    <span>Replying to</span>
                    <span className="text-blue-400">{comment.user.name}</span>
                  </p>
                </div>
                <div>
                  <p className="line-clamp-4">{comment.body}</p>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div className="w-full flex gap-1">
              <div className="w-14 hidden md:block">
                <div className="avatar">
                  <div className="w-12 rounded-full border">
                    <Image
                      src={session.user.image}
                      alt={session.user.name}
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <p>
                  Replying as{" "}
                  <span className="font-semibold">{session.user.name}</span>
                </p>
                <textarea
                  className=" w-full px-4 pr-16 py-2 h-32 border rounded focus:outline-none resize-none overflow-x-hidden"
                  placeholder="What do you think about this comment ?"
                  onKeyDown={(e) => {
                    autosize(e.target);
                  }}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-primary text-sm text-white font-semibold capitalize tracking-wider rounded-full border-2 border-primary hover:bg-[#554f95] transition disabled:opacity-50"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
