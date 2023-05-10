import Link from "next/link";
import { BsBarChartFill, BsFire } from "react-icons/bs";
import { MdNewReleases } from "react-icons/md";

export default function FilterWidget() {
  return (
    <div className="w-full md:w-11/12 flex border rounded">
      <div className="w-2/6 h-28 flex flex-col justify-center items-center gap-2">
        <Link
          href=""
          className="w-14 h-14 flex justify-center items-center text-red-600 border rounded-full"
        >
          <BsFire size={30} />
        </Link>
        <span className="font-semibold">Most Like</span>
      </div>
      <div className="w-2/6 h-28 flex flex-col justify-center items-center gap-2">
        <Link
          href=""
          className="w-14 h-14 flex justify-center items-center text-primary border rounded-full"
        >
          <BsBarChartFill size={30} />
        </Link>
        <span className="font-semibold">Most Vote</span>
      </div>
      <div className="w-2/6 h-28 flex flex-col justify-center items-center gap-2">
        <Link
          href=""
          className="w-14 h-14 flex justify-center items-center text-yellow-400 border rounded-full"
        >
          <MdNewReleases size={30} />
        </Link>
        <span className="font-semibold">News Thred</span>
      </div>
    </div>
  );
}
