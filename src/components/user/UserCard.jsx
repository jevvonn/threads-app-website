import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserCard({ user }) {
  const { data: session } = useSession();
  const hasFollowed = !!user.followedBy?.length;

  return (
    <div className="w-full flex justify-between items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="avatar">
          <div className="w-12 rounded-full border">
            <Image alt="post-user" src={user.image} width={100} height={100} />
          </div>
        </div>
        <span className="font-semibold">{user.name}</span>
      </div>
      {session && session.user.id !== user.id ? (
        <>
          {hasFollowed ? (
            <button className="btn btn-sm btn-ghost border-primary capitalize tracking-wider">
              Unfollow
            </button>
          ) : (
            <button className="btn btn-sm btn-primary text-white capitalize tracking-wider">
              Follow
            </button>
          )}
        </>
      ) : (
        <Link
          href={`/u/${user.id}`}
          className="btn btn-sm btn-ghost border-primary border capitalize tracking-wider"
        >
          See Profile
        </Link>
      )}
    </div>
  );
}
