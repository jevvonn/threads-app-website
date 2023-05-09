import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";

function UserDropdown() {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return (
      <div className="my-2">
        <div className="flex gap-2">
          <Skeleton width={30} height={30} circle={true} />
          <Skeleton width={100} height={30} />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="btn btn-primary text-white btn-sm my-2"
      >
        Login
      </button>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle px-2 md:btn-block flex gap-2"
      >
        <div className="avatar">
          <div className="w-9 rounded-full">
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={40}
              height={40}
            />
          </div>
        </div>
        <span className="hidden md:block">{session.user.name}</span>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 w-52 border rounded"
      >
        <li>
          <Link className="justify-between text-lg" href={`profile`}>
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link className="text-lg" href={`settings`}>
            Settings
          </Link>
        </li>
        <li>
          <button onClick={() => signOut()} className="text-red-500 text-lg">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserDropdown;
