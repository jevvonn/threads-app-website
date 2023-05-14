import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

export default function SideVote({
  handleVote,
  hasVotedUp,
  hasVotedDown,
  voteCount,
}) {
  return (
    <div className="w-1/12 hidden md:flex flex-col  items-center text-primary">
      <button onClick={() => handleVote("vote_up")}>
        <IoCaretUpOutline
          size={35}
          color={hasVotedUp ? "" : "gray"}
          className="hidden md:block"
        />
      </button>
      <span className="font-semibold text-black">{voteCount}</span>
      <button onClick={() => handleVote("vote_down")}>
        <IoCaretDownOutline
          size={35}
          color={hasVotedDown ? "" : "gray"}
          className="hidden md:block"
        />
      </button>
    </div>
  );
}
