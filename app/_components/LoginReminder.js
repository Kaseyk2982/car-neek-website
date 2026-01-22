import Link from "next/link";

export default function LoginReminder() {
  return (
    <div className="px-6 py-12 flex justify-center text-center text-slate-300 text-2xl mt-8 max-w-1/2 m-auto border border-stone-600 bg-slate-800 flex-col">
      <p>
        Please{" "}
        <Link href={"/login"} className="text-slate-500">
          login
        </Link>
      </p>

      <p>to see the purchase form.</p>
    </div>
  );
}
