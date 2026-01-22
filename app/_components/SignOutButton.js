"use client";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="flex items-center gap-4 cursor-pointer"
    >
      <ArrowRightEndOnRectangleIcon className="h-6 w-6 text-slate-600" />
      <span>SignOut</span>
    </button>
  );
}
