import relativeDateTime from "@/utils/relativeDateTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

function SingleThread({ thread }) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const contentRef = useRef(null);
  const [needCut, setNeedCut] = useState(false);
  const timestamp = new Date(thread.createdAt).getTime();
  const hasVotedUp = !!thread.votedUpBy?.length;
  const hasVotedDown = !!thread.votedDownBy?.length;
  const hasLiked = !!thread.likedBy?.length;
  const hasSaved = !!thread.savedBy?.length;

  const { mutate: mutateVote } = useMutation(
    async ({ hasVoted, hasVotedType, voteType }) => {
      const { data } = await axios.post("/api/thread/action/vote", {
        id: thread.id,
        hasVoted,
        hasVotedType,
        voteType,
      });
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["threads"], {
          refetchPage: (_, index) => index === thread.page,
        });
        toast.success(() => (
          <b>{`You ${
            hasVotedUp || hasVotedDown ? "unvoted" : "voted"
          } the thred's !`}</b>
        ));
      },
    }
  );

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

  useEffect(() => {
    if (contentRef.current.clientHeight > 250) {
      setNeedCut(true);
    }
  }, []);

  function handleVote(voteType) {
    if (!session) {
      toast.error(() => <b>Please login first!</b>);
      return;
    }

    const data = {
      hasVoted: hasVotedUp || hasVotedDown ? true : false,
      hasVotedType: hasVotedUp ? "voted_up" : "voted_down",
      voteType,
    };

    mutateVote(data);
  }

  function handleLike() {
    if (!session) {
      toast.error(() => <b>Please login first!</b>);
      return;
    }

    mutateLike({ hasLiked });
  }

  function handleSave() {
    if (!session) {
      toast.error(() => <b>Please login first!</b>);
      return;
    }

    mutateSave({ hasSaved });
  }

  return (
    <div className="w-full flex">
      <div className="w-1/12 hidden md:flex flex-col  items-center text-primary">
        <button onClick={() => handleVote("vote_up")}>
          <IoCaretUpOutline
            size={35}
            color={hasVotedUp ? "" : "gray"}
            className="hidden md:block"
          />
        </button>
        <span className="font-semibold text-black">
          {thread._count.votedUpBy - thread._count.votedDownBy}
        </span>
        <button onClick={() => handleVote("vote_down")}>
          <IoCaretDownOutline
            size={35}
            color={hasVotedDown ? "" : "gray"}
            className="hidden md:block"
          />
        </button>
      </div>

      <div className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2 ">
        <Link href={`/t/${thread.id}`} className="flex flex-col gap-2">
          <Link
            href={`/u/${thread.user.id}`}
            className="group w-full flex gap-2"
          >
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
            <div>
              <span className="group-hover:underline font-semibold">
                {thread.user.name}
              </span>
              <div className="flex gap-1 font-normal">
                {relativeDateTime(timestamp)}
              </div>
            </div>
          </Link>
          <h3 className="font-semibold text-xl">{thread.title}</h3>
          {thread.type == "POST_SOURCE" &&
            thread.sources.map((src) => (
              <img src={src.url} className="w-full" />
            ))}
          {thread.type == "POST_BODY" && (
            <div
              ref={contentRef}
              className={`w-full relative ${
                needCut ? "cute-content" : ""
              } prose prose-base prose-img:m-0`}
              dangerouslySetInnerHTML={{ __html: thread.body }}
            />
          )}
        </Link>
        <div className="flex justify-end gap-3">
          <div className="md:hidden flex items-center text-primary">
            <button>
              <IoCaretUpOutline color={hasVotedUp ? "gray" : ""} size={27} />
            </button>
            <span className="w-10 text-center font-semibold text-black">
              {thread._count.votedUpBy - thread._count.votedDownBy}
            </span>
            <button>
              <IoCaretDownOutline
                color={hasVotedDown ? "gray" : ""}
                size={27}
              />
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
      </div>
    </div>
  );
}

export default SingleThread;
