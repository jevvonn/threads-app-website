import { useMemo, useRef } from "react";
import { SingleUpload } from "../../../../firebase/upload";
import { toast } from "react-hot-toast";
import ReactQuill from "@/components/quill/ReactQuill";
import Delta from "quill-delta";

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

    const quillObj = quillRef?.current;
    const range = quillObj?.getEditor().getSelection();

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
      quillObj.editor.updateContents(
        new Delta().retain(range.index).insert(
          {
            image: url,
          },
          {
            alt: "post-image",
          }
        )
      );
    };
  }

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      forwardedRef={quillRef}
      placeholder="What's on your mind ?"
    />
  );
}
