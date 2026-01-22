import { signInActionGithub } from "@/app/_lib/actions";
import { SiGithub } from "react-icons/si";

export default function GoogleSigninButton() {
  return (
    <form action={signInActionGithub}>
      <button className="flex items-center gap-6 border border-slate-300 px-10 py-4 text-lg font-medium cursor-pointer">
        {" "}
        <SiGithub className="h-6 w-6" />
        <span>Continue with GitHub</span>
      </button>
    </form>
  );
}
