import VehicleList from "@/app/_components/VehicleList";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";

export const revalidate = 3600;

export const metadata = {
  title: "Vehicles",
};

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const filter = resolvedSearchParams?.price ?? "all";

  return (
    <div>
      <div>
        <h1 className="text-5xl text-stone-500 font-semibold mb-6">
          Our luxury vehicles
        </h1>
        <p className="text-slate-300 text-xl">
          Step into Car-Neek and feel the pulse of automotive passion—where
          every gleaming vehicle whispers tales of speed, heritage, and
          unbridled exhilaration, waiting for the fortunate few to claim their
          piece of automotive legend.
        </p>
      </div>
      <Filter />
      <Suspense fallback={<Spinner size="lg" color="stone" />} key={filter}>
        <VehicleList filter={filter} />
      </Suspense>
    </div>
  );
}
