import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { SingleUpload } from "../../../../firebase/upload";

export default function PostText({ value, onChange }) {
  const quillRef = useRef(null);
  const TOOLBAR_OPTION = [
    [{ size: ["large", false, "small"] }],
    ["bold", "italic", "underline", "strike", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
  ];

  const ReactQuill = useMemo(
    () =>
      dynamic(
        async () => {
          const { default: RQ } = await import("react-quill");
          // eslint-disable-next-line react/display-name
          return ({ forwardedRef, ...props }) => (
            <RQ ref={forwardedRef} {...props} />
          );
        },
        { ssr: false }
      ),
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: TOOLBAR_OPTION,
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    const quillObj = quillRef?.current?.getEditor();
    const range = quillObj?.getSelection();

    input.onchange = async () => {
      const file = input.files[0];
      const url = await SingleUpload(
        file,
        `body-${Math.random()}`,
        "post-body"
      );
      input.remove();
      quillObj.editor.insertEmbed(range.index, "image", url);
    };
  }

  return (
    <>
      <ReactQuill
        value={value}
        theme="snow"
        onChange={onChange}
        modules={modules}
        forwardedRef={quillRef}
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
