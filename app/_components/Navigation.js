"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  function isActive(path) {
    return pathname === path || pathname.startsWith(path);
  }

  return (
    <nav className="text-xl z-10 font-semibold">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/vehicles"
            className={`hover:text-stone-500 transition-all ${
              isActive("/vehicles") ? "text-stone-500" : ""
            }`}
          >
            Vehicles
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`hover:text-stone-500 transition-all ${
              isActive("/about") ? "text-stone-500" : ""
            }`}
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className={`hover:text-stone-500 transition-all flex gap-4 items-center ${
                isActive("/account") ? "text-stone-500" : ""
              }`}
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                className="h-8 rounded-lg"
                referrerPolicy="no-referrer"
              />
              <span>Account</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className={`hover:text-stone-500 transition-all ${
                isActive("/account") ? "text-stone-500" : ""
              }`}
            >
              Account
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
