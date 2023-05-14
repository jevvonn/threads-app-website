import useMutationVote from "@/hooks/thread/useMutationVote";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

export default function SideVote({ thread }) {
  const hasVotedUp = !!thread.votedUpBy?.length;
  const hasVotedDown = !!thread.votedDownBy?.length;
  const { handleVote } = useMutationVote(thread.id, thread.page);

  return (
    <div className="w-1/12 hidden md:flex flex-col  items-center text-primary">
      <button onClick={() => handleVote("vote_up", hasVotedUp, hasVotedDown)}>
        <IoCaretUpOutline
          size={35}
          color={hasVotedUp ? "" : "gray"}
          className={`hidden md:block ${hasVotedUp ? "animate-up-up" : ""}`}
        />
      </button>
      <span className="font-semibold text-black">
        {thread._count.votedUpBy - thread._count.votedDownBy}
      </span>
      <button onClick={() => handleVote("vote_down", hasVotedUp, hasVotedDown)}>
        <IoCaretDownOutline
          size={35}
          color={hasVotedDown ? "" : "gray"}
          className={`hidden md:block ${
            hasVotedDown ? "animate-down-down" : ""
          }`}
        />
      </button>
    </div>
  );
}
