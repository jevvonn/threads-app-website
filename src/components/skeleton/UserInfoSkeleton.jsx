import Skeleton from "react-loading-skeleton";
import TagItemSkeleton from "./TagItemSkeleton";

export default function UserInfoSkeleton() {
  return (
    <div className="lg:w-4/12 flex flex-col gap-5 z-0">
      <div className="flex flex-col gap-4">
        <div className="w-full hidden h-full border rounded lg:flex flex-col">
          <div className="w-full py-2 flex justify-center items-center bg-primary rounded-t">
            <Skeleton width={200} height={30} />
          </div>
          <div className="px-4 py-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Skeleton height={40} width={40} circle={true} />
              <Skeleton height={30} width={200} />
            </div>
            <Skeleton width={250} height={30} />
            <hr />
            <div className="flex flex-col gap-2 justify-center items-center">
              <Skeleton width={200} height={35} />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-center  w-full  border">
          <div className="w-full py-2 flex justify-center items-center bg-primary rounded-t">
            <Skeleton width={200} height={30} />
          </div>
          <div className="w-11/12 flex flex-wrap gap-1 py-4">
            <TagItemSkeleton total={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
