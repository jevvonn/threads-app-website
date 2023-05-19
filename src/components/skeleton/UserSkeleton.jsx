import Skeleton from "react-loading-skeleton";

export default function UserSkeleton({ total = 1 }) {
  return new Array(total).fill(0).map((_, i) => (
    <div className="w-full flex justify-between items-center gap-3" key={i}>
      <div className="flex items-center gap-2 w-full">
        <Skeleton width={40} height={40} circle={true} />
        <Skeleton width={160} className="w-full" height={35} />
      </div>
    </div>
  ));
}
