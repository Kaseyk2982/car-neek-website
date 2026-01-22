import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        We have received your updated purchase!
      </h1>
      <p>If necessary we will contact you shortly regarding payment details.</p>
      <Link
        href="/account/purchases"
        className="underline text-xl text-stone-400 inline-block"
      >
        Manage your purchases &rarr;
      </Link>
    </div>
  );
}
