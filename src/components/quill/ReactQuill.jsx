import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

export default function ReactQuill({
  forwardedRef,
  value,
  onChange,
  modules,
  placeholder,
}) {
  const RQ = useMemo(
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

  return (
    <RQ
      value={value}
      theme="snow"
      onChange={onChange}
      modules={modules}
      forwardedRef={forwardedRef}
      placeholder={placeholder}
    />
  );
}
