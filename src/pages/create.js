import PostFile from "@/components/thread/create/PostFile";
import PostText from "@/components/thread/create/PostText";
import Navbar from "@/components/navigation/Navbar";
import { useState } from "react";
import { BsFileRichtext, BsCardImage } from "react-icons/bs";
import { getServerAuthSession } from "./api/auth/[...nextauth]";
import Head from "next/head";
import autosize from "autosize";
import { TagInput } from "@/components/thread/create/TagInput";
import { toast } from "react-hot-toast";
import useMutationCreate from "@/hooks/thread/useMutationCreate";
import AlertToast from "@/components/toast/AlertToast";

export default function Create() {
  const [activeTab, setActiveTab] = useState("POST_BODY");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("<p><br></p>");
  const [tags, setTags] = useState([]);

  const { mutatePost, isLoading } = useMutationCreate();

  async function handleSubmit() {
    if (!title)
      return toast.custom(() => (
        <AlertToast isSuccess={false} text={"Please fill your title"} />
      ));
    if (activeTab == "POST_BODY" && (!body || body == "<p><br></p>"))
      return toast.custom(() => (
        <AlertToast isSuccess={false} text={"Please fill your content"} />
      ));
    if (!tags.length)
      return toast.custom(() => (
        <AlertToast isSuccess={false} text={"Please add at least one tag"} />
      ));

    if (activeTab == "POST_BODY") {
      mutatePost({ title, body, tags, type: activeTab });
    }
  }

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
                  ? `activeTabStyle rounded-l font-semibold`
                  : `baseStyleTab rounded-l font-semibold`
              }
            >
              <BsFileRichtext size={30} />
              Story
            </button>
            <button
              onClick={() => setActiveTab("POST_SOURCE")}
              className={
                activeTab === "POST_SOURCE"
                  ? `activeTabStyle rounded-r font-semibold`
                  : `baseStyleTab rounded-r font-semibold`
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
          <div className="flex flex-col gap-2">
            <TagInput tags={tags.map(tag => ({ value:tag, label:tag }))} onNewTags={setTags} />
          </div>
          <hr />
          <div className="flex justify-end pr-6 gap-3">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-1 bg-primary rounded-full text-white font-semibold tracking-wide disabled:opacity-50"
            >
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
