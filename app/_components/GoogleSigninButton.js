import Image from "next/image";
import { signInActionGoogle } from "@/app/_lib/actions";

export default function GoogleSigninButton() {
  return (
    <form action={signInActionGoogle}>
      <button className="flex items-center gap-6 border border-slate-300 px-10 py-4 text-lg font-medium cursor-pointer">
        {" "}
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={24}
          height={24}
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
