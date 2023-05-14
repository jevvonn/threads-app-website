import relativeDateTime from "@/utils/relativeDateTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import SideVote from "./partial/SideVote";
import BotomAction from "./partial/BotomAction";

function SingleThread({ thread }) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const contentRef = useRef(null);
  const [needCut, setNeedCut] = useState(false);
  const timestamp = new Date(thread.createdAt).getTime();
  const hasVotedUp = !!thread.votedUpBy?.length;
  const hasVotedDown = !!thread.votedDownBy?.length;

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

  return (
    <div className="w-full flex">
      <SideVote
        handleVote={handleVote}
        hasVotedDown={hasVotedDown}
        hasVotedUp={hasVotedUp}
        voteCount={thread._count.votedUpBy - thread._count.votedDownBy}
      />
      <div className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2 ">
        <Link href={`/t/${thread.id}`} className="flex flex-col gap-2">
          <div className="w-full flex gap-2">
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
              <span className="font-semibold">{thread.user.name}</span>
              <div className="flex gap-1 font-normal">
                {relativeDateTime(timestamp)}
              </div>
            </div>
          </div>
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
        <BotomAction handleVote={handleVote} thread={thread} />
      </div>
    </div>
  );
}

export default SingleThread;
