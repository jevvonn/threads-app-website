import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

export default function PostText({ value, onChange }) {
  const TOOLBAR_OPTION = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
  ];

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <>
      <ReactQuill
        value={value}
        theme="snow"
        onChange={onChange}
        modules={{ toolbar: TOOLBAR_OPTION }}
        placeholder="What's on your mind ?"
      />

      <style>{`
        .ql-toolbar{
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .ql-container{
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .ql-editor {
          min-height: 200px;
        }
      `}</style>
    </>
  );
}
