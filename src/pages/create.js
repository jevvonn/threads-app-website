import PostFile from "@/components/thread/create/PostFile";
import PostText from "@/components/thread/create/PostText";
import Navbar from "@/components/navigation/Navbar";
import { useState } from "react";
import { BsFileRichtext } from "react-icons/bs";
import { BsCardImage } from "react-icons/bs";
import { getServerAuthSession } from "./api/auth/[...nextauth]";
import Head from "next/head";
import autosize from "autosize";

export default function Create() {
  const [activeTab, setActiveTab] = useState("POST_BODY");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <>
      <Head>
        <title>Create a Thred</title>
      </Head>

      <Navbar />
      <div className="lg:w-3/5 p-2 mx-auto mt-20">
        <h1 className="text-center text-3xl font-semibold">
          Create <span className="text-primary">a</span> {`Thred${"'"}s`}
        </h1>
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex">
            <button
              onClick={() => setActiveTab("POST_BODY")}
              className={
                activeTab === "POST_BODY"
                  ? `activeTabStyle rounded-l`
                  : `baseStyleTab rounded-l`
              }
            >
              <BsFileRichtext size={30} />
              {`Thred${"'"}s`}
            </button>
            <button
              onClick={() => setActiveTab("POST_SOURCE")}
              className={
                activeTab === "POST_SOURCE"
                  ? `activeTabStyle rounded-r`
                  : `baseStyleTab rounded-r`
              }
            >
              <BsCardImage size={30} />
              Images & Video
            </button>
          </div>
          <div className="flex justify-between items-center relative">
            <textarea
              type="text"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
                autosize(e.target);
              }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title"
              className="w-full px-4 pr-16 py-2 border rounded focus:outline-none resize-none"
            />
            <p
              className={`absolute right-5 ${
                title.length > 300 && "text-red-500"
              }`}
            >
              <span>{title.length}</span>/300
            </p>
          </div>
          {activeTab === "POST_BODY" ? (
            <PostText value={body} onChange={setBody} />
          ) : (
            <PostFile />
          )}
          <div>
            <button className="w-28 h-8 pl-5 mx-auto flex items-center gap-2 border rounded-full">
              <span className="text-3xl">+</span> Tags
            </button>
          </div>
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
