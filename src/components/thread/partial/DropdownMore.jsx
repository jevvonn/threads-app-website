import useDeleteThread from "@/hooks/thread/useDeleteThread";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineMore } from "react-icons/ai";
import { BsFillTrashFill, BsPencilFill, BsShareFill } from "react-icons/bs";

export default function DropdownMore({ thread }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { mutateDelete } = useDeleteThread(thread.id, thread.page);

  return (
    <>
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost btn-square btn-sm">
          <AiOutlineMore size={25} />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content shadow bg-base-100 rounded menu p-1 w-40 font-semibold border"
        >
          <li>
            <button>
              <BsShareFill /> Share
            </button>
          </li>
          {session?.user?.id === thread.user.id && (
            <>
              <li>
                <label htmlFor={`modal-delete-${thread.id}`}>
                  <BsFillTrashFill /> Delete
                </label>
              </li>
              <li>
                <button onClick={() => router.push(`/t/${thread.id}/edit`)}>
                  <BsPencilFill /> Edit
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      <>
        <input
          type="checkbox"
          id={`modal-delete-${thread.id}`}
          className="modal-toggle"
        />
        <div className="modal" tabIndex={-1}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this {`thred's ?`}
            </h3>
            <p className="py-4">
              This action is irreversible. You will not be able to recover it.
            </p>
            <div className="modal-action">
              <label
                htmlFor={`modal-delete-${thread.id}`}
                className="btn btn-ghost bg-base-300"
              >
                Cancel
              </label>
              <button className="btn btn-error" onClick={mutateDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
