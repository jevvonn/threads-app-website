import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { SingleUpload } from "../../../../firebase/upload";
import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";

export default function PostFile({ source, setSource }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles, fileRejections) => {
      fileRejections.forEach((file) => {
        let errMessages = "";
        file.errors.forEach((err) => (errMessages += `• ${err.message}\n`));
        toast.error(errMessages, {
          style: { maxWidth: "max-content" },
          className: "font-semibold",
        });
      });
      if (!acceptedFiles.length) return;

      toast.loading("Uploading files...", { id: "upload-source" });
      for (const file of acceptedFiles) {
        const url = await SingleUpload(
          file,
          `post-${Math.random()}`,
          "post-image"
        );
        const type = file.type.split("/")[0];

        setSource((prev) => [...prev, { type, url }]);
      }

      toast.dismiss();
      toast.success("Upload successful!", { id: "upload-source" });
    },
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 15000000,
    maxFiles: 5,
  });

  const handleRemove = (idx) => {
    setSource((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      <div
        className={`w-full flex justify-center items-center gap-3 p-4 border rounded text-lg text-primary focus:outline-none ${
          source.length ? "h-20" : "h-52"
        }`}
        {...getRootProps()}
      >
        <span>Drag and drop images or</span>
        <div className="px-3 py1 border border-primary rounded-full text-base text-primary font-semibold cursor-pointer">
          <input {...getInputProps()} />
          Upload
        </div>
      </div>
      {source.length ? (
        <div className="w-full flex gap-3 p-4 border flex-wrap justify-center">
          {source.map(
            (src, idx) =>
              src.type === "image" && (
                <div
                  className="aspect-square hover:bg-base-200 rounded relative"
                  key={idx}
                >
                  <button
                    onClick={() => handleRemove(idx)}
                    className="btn btn-sm btn-circle btn-ghost absolute -top-2 -right-2"
                  >
                    <RxCrossCircled size={25} />
                  </button>
                  <Image
                    src={src.url}
                    alt="post-source"
                    width={150}
                    height={150}
                    className="object-contain w-full h-full rounded"
                  />
                </div>
              )
          )}
        </div>
      ) : null}
    </>
  );
}
