"use client";

import Link from "next/link";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

export default function SideNavigation() {
  const pathName = usePathname();

  const isActive = (path) => {
    if (path === "/account") {
      return pathName === "/account";
    }
    return pathName === path || pathName.startsWith(`${path}/`);
  };

  return (
    <nav className="border-r border-r-stone-700 text-slate-100">
      <ul className="flex flex-col gap-3 text-xl h-full">
        <li
          className={`flex gap-4 hover:bg-slate-900 py-3 px-3 ${
            isActive("/account") ? "bg-slate-900" : ""
          }`}
        >
          <HomeIcon className="h-5 w-5 text-slate-600" />
          <Link href="/account">Home</Link>
        </li>
        <li
          className={`flex gap-4 hover:bg-slate-900 py-3 px-3 ${
            isActive("/account/purchases") ? "bg-slate-900" : ""
          }`}
        >
          <ShoppingCartIcon className="h-5 w-5 text-slate-600" />
          <Link href="/account/purchases">Purchases</Link>
        </li>
        <li
          className={`flex gap-4 hover:bg-slate-900 py-3 px-3 ${
            isActive("/account/profile") ? "bg-slate-900" : ""
          }`}
        >
          <UserIcon className="h-5 w-5 text-slate-600" />
          <Link href="/account/profile">Profile</Link>
        </li>

        <li className="flex gap-4 mt-auto hover:bg-slate-900 py-3 px-4">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
