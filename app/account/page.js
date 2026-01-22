import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(" ")[0];

  return (
    <div className="text-2xl text-stone-500 font-semibold">
      Welcome, {firstName}
    </div>
  );
}
