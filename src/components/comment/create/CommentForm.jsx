import ReactQuill from "@/components/quill/ReactQuill";
import autosize from "autosize";
import { useSession } from "next-auth/react";

export default function CommentForm({ thread }) {
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-col gap-2">
      <div>
        Comment as <span className="font-semibold">{session.user.name}</span>
      </div>
      <textarea
        placeholder="What do you think ?"
        onKeyDown={(e) => {
          autosize(e.target);
        }}
        className="max-h-44 w-full px-4 pr-16 py-2 h-32 border rounded focus:outline-none resize-none overflow-x-hidden"
      />
      <div className="flex justify-end">
        <button className="px-4 py-1 bg-primary rounded-full text-white font-semibold tracking-wide disabled:opacity-50">
          Comment
        </button>
      </div>
    </div>
  );
}
