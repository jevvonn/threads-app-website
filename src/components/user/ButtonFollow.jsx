import useFollowUser from "@/hooks/user/useFollowUser";
import { AiOutlineLoading } from "react-icons/ai";
import { BiCheck, BiPlus } from "react-icons/bi";

export default function ButtonFollow({ user }) {
  const hasFollowed = !!user.followedBy?.length;
  const { followUser, isLoading: isFollowLoading } = useFollowUser();

  const handleFollow = async () => {
    followUser({ id: user.id, hasFollowed });
  };

  return (
    <button
      onClick={handleFollow}
      className={`btn btn-primary ${
        hasFollowed ? "btn-outline" : ""
      } text-white md:w-1/2 btn-sm flex gap-1 text-sm rounded normal-case hover:text-white items-center`}
    >
      {hasFollowed ? (
        <>
          <BiCheck size={20} /> Following
        </>
      ) : (
        <>
          <BiPlus size={20} /> Follow
        </>
      )}
      {isFollowLoading && (
        <AiOutlineLoading size={20} className="animate-spin" />
      )}
    </button>
  );
}
