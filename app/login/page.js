import GoogleSigninButton from "@/app/_components/GoogleSigninButton";
import GithubSigninButton from "@/app/_components/GithubSigninButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-8 items-center text-4xl text-slate-200 font-semibold">
      <h2>Please login to access your account</h2>
      <div className="flex flex-col gap-4">
        <GoogleSigninButton />
        <GithubSigninButton />
      </div>
    </div>
  );
}
