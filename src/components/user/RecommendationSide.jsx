import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default function RecommendationSide() {
  return (
    <div className="hidden w-2/6 lg:block">
      <div className="w-full py-6 px-4 flex flex-col items-center gap-4 border rounded mt-32">
        <h2 className="font-semibold text-xl">Follow More thred'er</h2>
        <div className="w-14 h-14 flex justify-center items-center bg-secondary text-primary border rounded-full">
          <AiOutlineUsergroupAdd size={30} />
        </div>
        <div className="w-full flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-14 rounded-full border">
                <img src="https://mediapublica.co/wp-content/uploads/2015/01/Mr_beans_holiday_ver2.jpg" />
              </div>
            </div>
            <span className="font-semibold">Ibrahim Syah Qordhawi</span>
          </div>
          <button className="btn btn-sm btn-primary text-white capitalize tracking-wider">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
