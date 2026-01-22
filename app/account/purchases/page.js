import SalesCard from "@/app/_components/SalesCard";
import { auth } from "@/app/_lib/auth";
import { getSales } from "@/app/_lib/data-service";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  const sales = await getSales(session.user.customerId);

  return (
    <>
      {sales.length > 0 ? (
        <div>
          <h2 className="text-3xl text-stone-400">Your Purchases</h2>
          <div className="flex flex-col gap-5 mt-10">
            {sales.map((sale) => (
              <SalesCard sale={sale} key={sale.id} />
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-xl">
          You currently have no purchased vehicles to display, check out our{" "}
          <Link className="text-stone-500 underline" href="/vehicles">
            luxury vehicles &rarr;
          </Link>{" "}
        </h2>
      )}
    </>
  );
}
