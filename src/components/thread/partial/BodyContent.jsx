import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ImageContent from "./ImageContent";

export default function BodyContent({ thread, needToCut }) {
  const contentRef = useRef(null);
  const [needCut, setNeedCut] = useState(false);

  useEffect(() => {
    if (contentRef.current?.clientHeight > 250 && needToCut) {
      setNeedCut(true);
    }
  }, [contentRef]);

  return (
    <>
      <h3 className="font-semibold text-xl">{thread.title}</h3>
      {thread.type == "POST_SOURCE" && <ImageContent slides={thread.sources} />}
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
