import ReactQuill from "@/components/quill/ReactQuill";
import { useState, useMemo } from "react";

const TOOLBAR_OPTION = [
  [{ size: ["0.75em", "1em", "1.5em"] }],
  ["bold", "italic", "underline", "strike", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
];

export default function CommentForm({ thread }) {
  const [body, setBody] = useState("<p><br></p>");
  const modules = useMemo(
    () => ({
      toolbar: {
        container: TOOLBAR_OPTION,
      },
    }),
    []
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <div>
        Comment as <span className="font-semibold">{thread.user.name}</span>
      </div>
      <div className="min-h-[200px]">
        <ReactQuill
          value={body}
          modules={modules}
          onChange={setBody}
          placeholder={"Write a comment..."}
        />
      </div>
    </div>
  );
}
