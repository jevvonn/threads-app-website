import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonFollow from "./ButtonFollow";

export default function UserCard({ user }) {
  const { data: session } = useSession();

  return (
    <div className="w-full flex gap-3 border roudned p-2 items-center">
      <Link href={`/u/${user.id}`}>
        <div className="avatar">
          <div className="w-12 rounded-full border">
            <Image alt="post-user" src={user.image} width={100} height={100} />
          </div>
        </div>
      </Link>
      <div className="w-full">
        <div className="flex w-full h-12 justify-between items-center gap-2">
          <Link href={`/u/${user.id}`}>
            <p className="hover:underline">{user.name}</p>
          </Link>
          <div className="w-max">
            {session && session.user.id !== user.id ? (
              <ButtonFollow user={user} className="w-max" />
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
        {user.bio && <p className="text-sm text-gray-500">{user.bio}</p>}
      </div>
    </div>
  );
}
