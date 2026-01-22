import { getVehicles } from "@/app/_lib/data-service";
import VehicleCard from "@/app/_components/VehicleCard";

export default async function VehicleList({ filter }) {
  const vehicles = await getVehicles(filter);

  if (!vehicles.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-10">
      {vehicles.map((vehicle) => (
        <VehicleCard vehicle={vehicle} key={vehicle.id} />
      ))}
    </div>
  );
}
