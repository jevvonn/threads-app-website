import PostFile from "@/components/thread/create/PostFile";
import PostText from "@/components/thread/create/PostText";
import Navbar from "@/components/navigation/Navbar";
import { useEffect, useState } from "react";
import { BsFileRichtext } from "react-icons/bs";
import { BsCardImage } from "react-icons/bs";
import { getServerAuthSession } from "./api/auth/[...nextauth]";
import Head from "next/head";
import autosize from "autosize";
import { TagInput } from "@/components/thread/create/TagInput";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function Create() {
  const router = useRouter();
  let toastId;

  const [activeTab, setActiveTab] = useState("POST_BODY");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  const { mutateAsync: mutatePostBody, isLoading } = useMutation(
    async ({ title, body, tags, type, isDraft }) => {
      const res = await fetch("/api/thread/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          tags,
          type,
          isDraft,
        }),
      });
      const data = await res.json();
      return data;
    },
    {
      onSuccess: (data) => {
        toast.success("Your Thred has been posted", {
          id: toastId,
        });
        router.push(`/t/${data.threadId}`);
      },
    }
  );

  async function handleSubmit(isDraft) {
    if (!title) {
      toast.error("Please fill title fields", { id: toastId });
      return;
    }

    if (activeTab == "POST_BODY" && !body) {
      toast.error("Please fill your content fields", { id: toastId });
      return;
    }

    if (!tags.length) {
      toast.error("Please add minimal 1 tag", { id: toastId });
      return;
    }

    if (activeTab == "POST_BODY") {
      toastId = toast.loading(`Posting your Thread's`, { id: toastId });
      await mutatePostBody({ title, body, tags, type: activeTab, isDraft });
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
          <div className="flex flex-col gap-2">
            <TagInput onNewTags={setTags} />
          </div>
          <hr />
          <div className="flex justify-end pr-6 gap-3">
            <button
              onClick={() => handleSubmit(true)}
              disabled={isLoading}
              className="px-4 py-1 border border-primary rounded-full text-primary font-semibold tracking-wide disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit(false)}
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
