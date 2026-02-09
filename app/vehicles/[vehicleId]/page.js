import dynamic from "next/dynamic";

import TextExpander from "@/app/_components/TextExpander";
import { getVehicle, getVehicles } from "@/app/_lib/data-service";
import { formatPrice } from "@/app/_utils/helpers";
import Image from "next/image";

import Purchase from "@/app/_components/Purchase";
import LoginReminder from "@/app/_components/LoginReminder";
import { auth } from "@/app/_lib/auth";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { make, model } = await getVehicle(resolvedParams.vehicleId);

  return { title: `${make}-${model}` };
}

export async function generateStaticParams() {
  const vehicles = await getVehicles();
  const ids = vehicles.map((vehicle) => ({
    vehicleId: String(vehicle.id),
  }));
  return ids;
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const vehicle = await getVehicle(resolvedParams.vehicleId);

  const { make, model, mileage, year, regularPrice, description, image } =
    vehicle;

  const session = await auth();

  return (
    <>
      <div className="max-w-6xl mx-auto mt-6">
        <div className="grid sm:grid-cols-1 lg:grid-cols-[3fr_4fr] border border-solid border-stone-500 px-4 py-6">
          <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-auto md:h-auto lg:-translate-x-8 lg:scale-[1.20]">
            <Image
              src={image}
              alt={`vehicle ${make}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>

          <div className="flex flex-col ml-0 md:ml-6 gap-4 px-4 text-slate-300 mt-6 md:mt-0">
            <div className="flex items-center gap-4">
              <h2 className="text-7xl">{make}</h2>
              <h3 className="text-5xl">{model}</h3>
            </div>

            <p className="text-slate-400 text-sm">
              <TextExpander>{description}</TextExpander>
            </p>

            <div className="flex flex-col gap-3 items-end px-4 text-xl">
              <ul>
                <li>Mileage: {mileage}</li>
                <li>Year: {year}</li>
                <li>Price: {formatPrice(regularPrice)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center text-5xl text-slate-300">
        <p>
          Purchase this {make} {model} today.
        </p>
      </div>
      {session?.user ? <Purchase vehicle={vehicle} /> : <LoginReminder />}
    </>
  );
}
