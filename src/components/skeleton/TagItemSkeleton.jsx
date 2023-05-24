import Skeleton from "react-loading-skeleton";

export default function TagItemSkeleton({ total }) {
  return new Array(total)
    .fill(0)
    .map((_, i) => <Skeleton key={i} width={50} height={25} />);
}
