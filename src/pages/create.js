import PostFile from "@/components/PostFile";
import PostText from "@/components/PostText";
import Navbar from "@/components/navigation/Navbar";
import { useState } from "react";
import { BsFileRichtext } from "react-icons/bs";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { getServerAuthSession } from "./api/auth/[...nextauth]";

export default function Create() {
  const [active, setActive] = useState(1);

  function changePost(id) {
    setActive(id);
  }
  return (
    <>
      <Navbar />
      <div className="lg:w-3/4 p-2 mx-auto mt-20">
        <h1 className="text-center text-3xl font-semibold">
          Create <span className="text-primary">a</span> Post
        </h1>
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex">
            <button
              onClick={() => changePost(1)}
              className={
                active === 1
                  ? "w-1/2 h-14 border border-blue-700 rounded-l text-blue-700 flex justify-center items-center gap-3 text-sm md:text-base"
                  : "w-1/2 h-14 border rounded-l flex justify-center items-center gap-3 text-sm md:text-base"
              }
            >
              <BsFileRichtext size={30} />
              Post
            </button>
            <button
              onClick={() => changePost(2)}
              className={
                active === 2
                  ? "w-1/2 h-14 border border-blue-700 rounded-r text-blue-700 flex justify-center items-center gap-3 text-sm md:text-base"
                  : "w-1/2 h-14 border rounded-r flex justify-center items-center gap-3 text-sm md:text-base"
              }
            >
              <BsCardImage size={30} />
              Images & Video
            </button>
          </div>
          <div className="flex justify-between items-center relative">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-4 pr-16 py-2 border rounded focus:outline-none"
            />
            <p className="absolute right-5">
              <span>0</span>/300
            </p>
          </div>
          {active === 1 ? <PostText /> : <PostFile />}
          <button className="w-28 h-8 pl-5 mx-auto flex items-center gap-2 border rounded-full">
            <span className="text-3xl">+</span> Tags
          </button>
          <hr />
          <div className="flex justify-end pr-6 gap-3">
            <button className="px-4 py-1 border border-primary rounded-full text-primary font-semibold tracking-wide">
              Save Draft
            </button>
            <button className="px-4 py-1 bg-primary rounded-full text-white font-semibold tracking-wide">
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getServerAuthSession(context.req, context.res);

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
