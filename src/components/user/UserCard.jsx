import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonFollow from "./ButtonFollow";

export default function UserCard({ user }) {
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-between items-center gap-3">
      <Link
        href={`/u/${user.id}`}
        className="flex items-center gap-2 tooltip"
        data-tip={user.name}
      >
        <div className="avatar">
          <div className="w-12 rounded-full border">
            <Image alt="post-user" src={user.image} width={100} height={100} />
          </div>
        </div>
      </Link>
      <div className="w-full">
        {session && session.user.id !== user.id ? (
          <ButtonFollow user={user} />
        ) : (
          <Link
            href={`/u/${user.id}`}
            className="btn btn-sm btn-primary btn-outline capitalize tracking-wider w-full rounded"
          >
            See Profile
          </Link>
        )}
      </div>
    </div>
  );
}
