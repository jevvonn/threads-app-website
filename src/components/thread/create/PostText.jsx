import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { SingleUpload } from "../../../../firebase/upload";
import { toast } from "react-hot-toast";

export default function PostText({ value, onChange }) {
  let toastLoadingId;
  const quillRef = useRef(null);
  const TOOLBAR_OPTION = [
    [{ size: ["0.75em", "1em", "1.5em"] }],
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
          const Size = RQ.Quill.import("attributors/style/size");
          Size.whitelist = ["0.75em", "1em", "1.5em"];
          RQ.Quill.register(Size, true);
          RQ.Quill.register(RQ.Quill.import("attributors/style/align"), true);

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
      toastLoadingId = toast.loading("Uploading...", { id: toastLoadingId });
      const url = await SingleUpload(
        file,
        `body-${Math.random()}`,
        "post-body"
      );
      input.remove();
      toast.success("Uploaded Successfully", { id: toastLoadingId });
      quillObj.editor.insertEmbed(range.index, "image", url);
    };
  }
  return (
    <ReactQuill
      value={value}
      theme="snow"
      onChange={onChange}
      modules={modules}
      forwardedRef={quillRef}
      placeholder="What's on your mind ?"
    />
  );
}
