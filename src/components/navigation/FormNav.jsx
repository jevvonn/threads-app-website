import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

export default function FormNav() {
  const { data } = useSession();

  return (
    <div className="w-full md:w-11/12 p-3 flex justify-between items-center border rounded">
      <div className="avatar">
        <div className="w-12 rounded-full border">
          <Image src={data?.user.image} width={40} height={40} alt="avatar" />
        </div>
      </div>
      <Link
        href={`/create`}
        className="btn btn-ghost btn-group flex items-center rounded-full"
      >
        <BiPlus size={25} />
        <span>New Thread</span>
      </Link>
    </div>
  );
}
