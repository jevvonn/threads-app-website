import Link from "next/link";

export default function TagItem({ tag }) {
  return (
    <Link
      href={`/tags?q=${tag.name}`}
      className="badge badge-ghost font-semibold badge-lg"
    >
      {tag.name}
    </Link>
  );
}
