import EditPurchaseForm from "@/app/_components/EditPurchaseForm";
import { getSale, getVehicle } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { saleId } = await params;

  const sale = await getSale(saleId);
  const vehicleId = sale.vehicleId;

  const vehicle = await getVehicle(vehicleId);

  return (
    <div>
      <h2 className="text-3xl text-stone-400">Update your purchase</h2>
      <EditPurchaseForm sale={sale} vehicle={vehicle} />
    </div>
  );
}
