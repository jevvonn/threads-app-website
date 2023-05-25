import AlertToast from "@/components/toast/AlertToast";
import useCreateComment from "@/hooks/comment/useCreateComment";
import useUpdateComment from "@/hooks/comment/useUpdateComment";
import { useQueryClient } from "@tanstack/react-query";
import autosize from "autosize";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function EditModal({ comment, thread, parentPage }) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [body, setBody] = useState(comment.body);
  const modalCloseRef = useRef(null);
  const { mutateUpdate, isLoading } = useUpdateComment();

  const handleSubmit = () => {
    if (!body || body == "")
      return toast.custom(() => (
        <AlertToast isSuccess={false} text={"Please fill your content"} />
      ));

    mutateUpdate(
      { commentId: comment.id, body },
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
          modalCloseRef.current.click();
          toast.custom(
            () => <AlertToast text={`Your comment has been update!`} />,
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
        id={`comment-edit-modal-${comment.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-2xl p-4 absolute top-9 flex flex-col gap-2">
          <label
            htmlFor={`comment-edit-modal-${comment.id}`}
            ref={modalCloseRef}
            className="btn btn-sm w-9 h-9 btn-circle absolute left-2 top-2 bg-transparent text-black text-base border-none hover:bg-zinc-200"
          >
            ✕
          </label>
          <div className="mt-8 flex flex-col">
            <p className="text-xl">Edit Your Comment</p>
            <div className="w-full mt-4 flex gap-1">
              <div className="w-14 hidden md:block">
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
              <div className="w-full flex flex-col gap-2">
                <textarea
                  className=" w-full min-h-[250px] px-4 pr-16 py-2 border rounded focus:outline-none resize-none overflow-x-hidden"
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
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
