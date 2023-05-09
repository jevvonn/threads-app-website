import Skeleton from "react-loading-skeleton";

export default function ThreadSkeleton({ total }) {
  return new Array(total).fill(0).map((_, index) => (
    <div className="w-full flex z-0" key={index}>
      <div className="w-1/12 hidden md:flex flex-col  items-center text-primary">
        <Skeleton height={30} width={30} />
        <Skeleton height={30} width={30} />
      </div>
      <div className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2">
        <div className="w-full flex gap-2 items-center">
          <Skeleton height={40} width={40} circle={true} />
          <Skeleton height={30} width={150} />
        </div>
        <Skeleton height={30} />
        <Skeleton height={100} />
        <div className="flex justify-end gap-3">
          <Skeleton height={30} width={180} />
        </div>
      </div>
    </div>
  ));
}
