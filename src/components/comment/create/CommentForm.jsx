import AlertToast from "@/components/toast/AlertToast";
import useCreateComment from "@/hooks/comment/useCreateComment";
import { useQueryClient } from "@tanstack/react-query";
import autosize from "autosize";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CommentForm({ thread }) {
  const { data: session } = useSession();
  const [body, setBody] = useState(``);
  const { mutateCreateComment, isLoading } = useCreateComment();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    if (!body || body == "")
      return toast.custom((t) => (
        <AlertToast t={t} isSuccess={false} text={"Please fill your content"} />
      ));

    mutateCreateComment(
      {
        threadId: thread.id,
        body,
        parentId: null,
        repliedToId: null,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries([
            "comments",
            { threadId: thread.id },
          ]);
          setBody(``);
          toast.custom(
            () => <AlertToast t={t} text={`Your comment has been added!`} />,
            { position: "top-center", id: "action-notification" }
          );
        },
      }
    );
  };

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
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="max-h-44 w-full px-4 pr-16 py-2 h-32 border rounded focus:outline-none resize-none overflow-x-hidden"
      />
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="px-4 py-1 bg-primary rounded-full text-white font-semibold tracking-wide disabled:opacity-50"
        >
          Comment
        </button>
      </div>
    </div>
  );
}
