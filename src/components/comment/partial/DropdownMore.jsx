import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { AiOutlineLoading, AiOutlineMore } from "react-icons/ai";
import useDeleteComment from "@/hooks/comment/useDeleteComment";
import { toast } from "react-hot-toast";
import AlertToast from "@/components/toast/AlertToast";
import { useQueryClient } from "@tanstack/react-query";
import EditModal from "./EditModal";

export default function DropdownMoreComment({ comment, thread, parentPage }) {
  const { mutateDelete, isLoading } = useDeleteComment(comment.id);
  const queryClient = useQueryClient();

  const handleDelete = () => {
    mutateDelete(
      {},
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
            () => <AlertToast text={`Your comment has been deleted.`} />,
            { position: "top-center", id: "action-notification" }
          );
        },
      }
    );
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          className="btn btn-sm rounded bg-transparent border-none text-black capitalize hover:bg-zinc-400"
        >
          <AiOutlineMore size={25} />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content shadow bg-base-100 rounded menu p-1 w-40 font-semibold border"
        >
          <li>
            <label htmlFor={`delete-comment-${comment.id}`}>
              <BsFillTrashFill /> Delete
            </label>
          </li>
          <li>
            <label htmlFor={`comment-edit-modal-${comment.id}`}>
              <BsPencilFill /> Edit
            </label>
          </li>
        </ul>
      </div>

      <EditModal comment={comment} thread={thread} parentPage={parentPage} />

      <>
        <input
          type="checkbox"
          id={`delete-comment-${comment.id}`}
          className="modal-toggle"
        />
        <div className="modal" tabIndex={-1}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this comment ?
            </h3>
            <p className="py-4">
              This action is irreversible. You will not be able to recover it.
            </p>
            <div className="modal-action">
              {!isLoading && (
                <label
                  htmlFor={`delete-comment-${comment.id}`}
                  className="btn btn-ghost bg-base-300"
                >
                  Cancel
                </label>
              )}
              <button
                disabled={isLoading}
                className="btn btn-error text-white disabled:opacity-80 disabled:pointer-events-none"
                onClick={handleDelete}
              >
                {!isLoading ? (
                  "Delete"
                ) : (
                  <AiOutlineLoading color="black" className="animate-spin" />
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
