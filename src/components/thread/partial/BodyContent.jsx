import { useState, useEffect, useRef } from "react";

export default function BodyContent({ thread, needToCut }) {
  const contentRef = useRef(null);
  const [needCut, setNeedCut] = useState(false);

  useEffect(() => {
    if (contentRef.current.clientHeight > 250 && needToCut) {
      setNeedCut(true);
    }
  }, [contentRef]);

  return (
    <>
      <h3 className="font-semibold text-xl">{thread.title}</h3>
      {thread.type == "POST_SOURCE" &&
        thread.sources.map((src) => (
          <Image key={src.id} src={src.url} className="w-full" />
        ))}
      {thread.type == "POST_BODY" && (
        <div
          ref={contentRef}
          className={`w-full relative ${
            needCut ? "cute-content" : ""
          } prose prose-base prose-img:m-0 prose-img:rounded text-gray-700 prose-p:m-0`}
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />
      )}
    </>
  );
}