import useInfiniteUsers from "@/hooks/user/useInfiniteUsers";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import UserSkeleton from "../skeleton/UserSkeleton";
import RecommendationCard from "./RecommendationCard";

export default function RecommendationSide() {
  const { users, isLoading } = useInfiniteUsers(["users"], "", false);

  return (
    <div className="hidden w-2/6 lg:block">
      <div className="w-full py-6 px-4 flex flex-col items-center gap-4 border rounded mt-32">
        <h2 className="font-semibold text-xl">Follow More thred'er</h2>
        <div className="w-14 h-14 flex justify-center items-center bg-secondary text-primary border rounded-full">
          <AiOutlineUsergroupAdd size={30} />
        </div>
        {users?.map((user) => (
          <RecommendationCard key={user.id} user={user} />
        ))}
        {isLoading && <UserSkeleton total={5} />}
      </div>
    </div>
  );
}
