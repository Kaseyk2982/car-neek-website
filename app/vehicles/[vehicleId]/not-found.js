import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This vehicle could not be found :(
      </h1>
      <Link
        href="/vehicles"
        className="inline-block bg-stone-500 text-slate-800 px-6 py-3 text-lg"
      >
        Go back to all vehicles
      </Link>
    </main>
  );
}

export default NotFound;
