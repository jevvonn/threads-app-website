import Link from "next/link";

export default function FormNav(){
    return (
      <div className="w-full md:w-11/12 p-3 flex justify-between items-center border rounded">
        <div className="avatar">
          <div className="w-10 rounded-full border">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
          </div>
        </div>
        <Link
          href=""
          className="w-9/12 h-10 flex items-center border-2 border-primary rounded"
        >
          <input
            type="text"
            placeholder="Whats on your mind"
            className="w-full h-full pl-5 focus:outline-none rounded"
          />
        </Link>
      </div>
    );
}