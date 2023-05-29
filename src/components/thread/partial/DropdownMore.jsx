import useDeleteThread from "@/hooks/thread/useDeleteThread";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineLoading, AiOutlineMore } from "react-icons/ai";
import { BiCheck, BiCopy } from "react-icons/bi";
import { BsFillTrashFill, BsPencilFill, BsShareFill } from "react-icons/bs";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function DropdownMore({ thread }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const shareURL = `https://${window.location.hostname}/t/${thread.id}`;

  const { mutateDelete, isLoading } = useDeleteThread(thread.id, thread.page);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

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
            <label htmlFor={`share-modal-${thread.id}`}>
              <BsShareFill /> Share
            </label>
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
          id={`share-modal-${thread.id}`}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box flex flex-col gap-4">
            <label
              htmlFor={`share-modal-${thread.id}`}
              className="btn bg-base-200 btn-ghost btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="font-bold text-xl text-center">
              Share This {`Thred's`}.
            </h3>
            <div className="flex items-center justify-center bg-base-200 p-2 rounded text-lg gap-2">
              <div className="overflow-x-auto prose text-lg">
                <code>{shareURL}</code>
              </div>
              <div onClick={copyToClipboard} className="cursor-pointer w-max">
                {!copied ? <BiCopy size={22} /> : <BiCheck size={22} />}
              </div>
            </div>
            <div className="divider mx-0">OR</div>
            <div className="flex gap-4 justify-center">
              <TwitterShareButton url={shareURL}>
                <TwitterIcon className="rounded-full w-10 h-10" />
              </TwitterShareButton>
              <FacebookShareButton url={shareURL}>
                <FacebookIcon className="rounded-full w-10 h-10" />
              </FacebookShareButton>
              <WhatsappShareButton url={shareURL}>
                <WhatsappIcon className="rounded-full w-10 h-10" />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </>

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
              {!isLoading && (
                <label
                  htmlFor={`modal-delete-${thread.id}`}
                  className="btn btn-ghost bg-base-300"
                >
                  Cancel
                </label>
              )}
              <button
                disabled={isLoading}
                className="btn btn-error text-white disabled:opacity-80 disabled:pointer-events-none"
                onClick={mutateDelete}
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
