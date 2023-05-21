import Navbar from "@/components/navigation/Navbar";
import PostText from "@/components/thread/create/PostText";
import { TagInput } from "@/components/thread/create/TagInput";
import useSingleThread from "@/hooks/thread/useSingleThread";
import { getServerAuthSession } from "@/pages/api/auth/[...nextauth]";
import autosize from "autosize";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, usesel } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function EditThread({ threadId, userId }) {
  const { thread, isLoading } = useSingleThread(threadId);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("<p><br></p>");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (thread) {
      setTitle(thread?.title);
      setBody(thread?.body);
      setTags(thread?.tags.map((tag) => tag.name));
    }
  }, [thread]);

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

            <PostText value={body} onChange={setBody} />
            <div className="flex flex-col gap-2">
              <TagInput
                tags={tags.map((tag) => ({ value: tag, label: tag }))}
                onNewTags={setTags}
              />
            </div>
            <hr />
            <div className="flex justify-end pr-6 gap-3">
              <button
                // onClick={handleSubmit}
                // disabled={isLoading}
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
