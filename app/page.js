import Image from "next/image";
import bg from "@/public/car-neek-home-image.jpg";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-0">
      <Image
        src={bg}
        alt="car-neek-image"
        fill
        quality={100}
        placeholder="blur"
        className="object-cover object-top"
      />
      <div className="relative z-10 text-center flex flex-col min-h-screen px-8">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-semibold tracking-tight leading-tight">
          Pre-Owned Auto Dealer
        </h1>
        <Link
          href="/vehicles"
          className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 text-lg font-medium shadow-2xl hover:shadow-orange-600/50 transition-all self-center"
        >
          Explore exotic vehicles
        </Link>
      </div>
    </main>
  );
}
