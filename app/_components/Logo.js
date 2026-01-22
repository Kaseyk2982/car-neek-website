import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-4 items-center z-10">
      <Image
        src={logo}
        height={80}
        width={80}
        quality={100}
        alt="car-neek-logo"
        className="rounded-full aspect-square"
      />
    </Link>
  );
}
