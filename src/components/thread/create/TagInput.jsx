import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

export const TagInput = ({ onNewTags, tags }) => {
  const [input, setInput] = useState("");
  const [defaultTags, setDefaultTags] = useState([]);

  const { data } = useQuery(
    ["tags", input],
    async () => {
      const res = await fetch(`/api/tag/search?query=${input}`);
      const data = await res.json();
      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const TagSelector = useMemo(() => {
    return dynamic(
      async () => {
        const { default: CR } = await import("react-select/creatable");
        return (props) => <CR onInputChange={(x) => setInput(x)} {...props} />;
      },
      { ssr: false }
    );
  }, []);

  useEffect(() => {
    if (data?.tags) {
      setDefaultTags(
        data.tags.map((tag) => ({ value: tag.name, label: tag.name }))
      );
    }
  }, [data]);

  return (
    <TagSelector
      isMulti
      placeholder="Tags..."
      value={tags}
      options={defaultTags}
      onChange={(newVal) => onNewTags(newVal.map((x) => x.value))}
    />
  );
};
