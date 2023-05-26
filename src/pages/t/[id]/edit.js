import Navbar from "@/components/navigation/Navbar";
import PostFile from "@/components/thread/create/PostFile";
import PostText from "@/components/thread/create/PostText";
import { TagInput } from "@/components/thread/create/TagInput";
import useSingleThread from "@/hooks/thread/useSingleThread";
import useUpdateThread from "@/hooks/thread/useUpdateThread";
import { getServerAuthSession } from "@/pages/api/auth/[...nextauth]";
import autosize from "autosize";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function EditThread({ threadId, userId }) {
  const { thread, isLoading } = useSingleThread(threadId);
  const { mutateUpdatePost, isLoading: loadingUpdate } = useUpdateThread();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("<p><br></p>");

  const [tags, setTags] = useState([]);
  const [deletedTags, setDeletedTags] = useState([]);

  const [source, setSource] = useState([]);
  const [deletedSources, setDeletedSources] = useState([]);
  const [newSources, setNewSources] = useState([]);

  const currentTags = thread?.tags.map((tag) => tag.name);
  const currentSource = thread?.sources;

  useEffect(() => {
    if (thread) {
      setTitle(thread?.title);
      setBody(thread?.body);
      setTags(thread?.tags.map((tag) => tag.name));
      setSource(thread?.sources);
    }
  }, [thread]);

  useEffect(() => {
    if (currentSource) {
      currentSource.forEach((src) => {
        if (!source.includes(src)) {
          setDeletedSources((prev) => [
            ...prev.filter((s) => s.url !== src.url),
            src,
          ]);
        } else if (source.includes(src)) {
          setDeletedSources((prev) => prev.filter((s) => s.url !== src.url));
        }
      });

      source.forEach((src) => {
        if (!currentSource.includes(src)) {
          setNewSources((prev) => [
            ...prev.filter((s) => s.url !== src.url),
            src,
          ]);
        }
      });

      newSources.forEach((src) => {
        if (!source.includes(src)) {
          setNewSources((prev) => prev.filter((s) => s.url !== src.url));
        }
      });
    }
  }, [source]);

  useEffect(() => {
    if (currentTags) {
      currentTags.forEach((tag) => {
        if (!tags.includes(tag)) {
          setDeletedTags((prev) => [
            ...prev.filter((tagged) => tagged !== tag),
            tag,
          ]);
        } else if (tags.includes(tag)) {
          setDeletedTags((prev) => prev.filter((tagged) => tagged !== tag));
        }
      });
    }
  }, [tags]);

  async function handleSubmit() {
    if (!title)
      return toast.custom(() => (
        <AlertToast isSuccess={false} text={"Please fill your title"} />
      ));
    if (thread.type == "POST_BODY" && (!body || body == "<p><br></p>"))
      return toast.custom(() => (
        <AlertToast isSuccess={false} text={"Please fill your content"} />
      ));
    if (thread.type == "POST_SOURCE" && !source.length)
      return toast.custom(() => (
        <AlertToast
          isSuccess={false}
          text={"Please upload some image or video"}
        />
      ));
    if (!tags.length)
      return toast.custom(() => (
        <AlertToast isSuccess={false} text={"Please add at least one tag"} />
      ));

    mutateUpdatePost({
      title,
      body,
      tags,
      deletedSources,
      newSources,
      userId,
      threadId,
      deletedTags,
    });
  }

  return (
    <>
      <Head>
        <title>Create a Thred</title>
      </Head>

      <Navbar />

      {thread && thread.user.id == userId && (
        <div className="lg:w-3/5 p-2 mx-auto mt-20">
          <h1 className="text-center text-3xl font-semibold">
            Edit <span className="text-primary">Your</span> {`Thred's`}
          </h1>
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex justify-between items-center relative">
              <textarea
                type="text"
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

            {thread.type == "POST_BODY" ? (
              <PostText value={body} onChange={setBody} />
            ) : (
              <PostFile setSource={setSource} source={source} />
            )}

            <div className="flex flex-col gap-2">
              <TagInput
                tags={tags.map((tag) => ({ value: tag, label: tag }))}
                onNewTags={setTags}
              />
            </div>
            <hr />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleSubmit}
                disabled={loadingUpdate}
                className="px-4 py-1 bg-primary rounded-full text-white font-semibold tracking-wide disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {(thread && thread.user.id != userId) || thread === null ? (
        <div className="w-full flex justify-center flex-col items-center gap-3 mt-24">
          <h3 className="font-bold text-lg">Post cannot be found.</h3>
          <Link href={"/"} className="underline font-semibold text-blue-500">
            Go Back To Home
          </Link>
        </div>
      ) : null}

      {isLoading && (
        <div className="w-full flex justify-center flex-col items-center gap-3 mt-24">
          <AiOutlineLoading3Quarters size={40} className="animate-spin" />
        </div>
      )}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const session = await getServerAuthSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      threadId: id,
      userId: session.user.id,
    },
  };
};
