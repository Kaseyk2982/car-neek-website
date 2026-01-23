import Image from "next/image";
import {
  formatPrice,
  getZonedCalendarDate,
  TIME_ZONE,
} from "../_utils/helpers";
import { formatDate } from "@/app/_utils/helpers";
import {
  format,
  formatDistance,
  parseISO,
  formatDistanceToNow,
  differenceInCalendarDays,
} from "date-fns";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import DeletePurchase from "./DeletePurchase";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default function SalesCard({ sale }) {
  const {
    id: saleId,
    vehicles: { image, make, model },
    created_at,
    salePrice,
    status,
    soldBy,
    pickupDate,
    downPayment,
    totalOwed,
  } = sale;

  return (
    <div className="flex flex-col lg:flex-row border border-stone-500">
      <div className="relative w-full h-64 lg:w-32 md:h-32">
        <Image
          src={image}
          alt={`${make} ${model} image`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between px-6 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl text-stone-400 font-semibold">{make}</h2>
            <h3 className="text-2xl text-stone-400 font-semibold">{model}</h3>
          </div>

          <p className="text-sm">
            Pickup:{" "}
            {(() => {
              const pickupDateObj = new Date(pickupDate);

              const formattedPickup = pickupDateObj
                .toLocaleDateString("en-US", {
                  timeZone: TIME_ZONE,
                  weekday: "short",
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .replace(", ", " ");

              const zonedNow = getZonedCalendarDate(Date.now());
              const zonedPickup = getZonedCalendarDate(pickupDate);

              const daysDiff = differenceInCalendarDays(zonedPickup, zonedNow);

              let relative = "";
              if (Math.abs(daysDiff) < 2) {
                if (daysDiff === 0) relative = "today";
                else if (daysDiff === 1) relative = "tomorrow";
                else if (daysDiff === -1) relative = "yesterday";
              } else if (Math.abs(daysDiff) < 30) {
                const abs = Math.abs(daysDiff);
                relative = `${abs} day${abs > 1 ? "s" : ""} ${daysDiff > 0 ? "till" : "ago"}`;
              } else {
                relative = formatDistance(zonedPickup, zonedNow, {
                  addSuffix: true,
                });
              }

              return (
                <>
                  {formattedPickup}
                  <span> ({relative})</span>
                </>
              );
            })()}
          </p>

          <span
            className={`
        px-6 py-1 rounded-full text-sm font-medium
        ${
          status === "paid"
            ? "bg-green-100 text-green-800"
            : "bg-amber-100 text-amber-800"
        }
      `}
          >
            {status === "paid" ? "Complete" : "Pending"}
          </span>
        </div>
        {/* <div className="flex justify-center gap-12"></div> */}
        <div className="flex flex-col items-center lg:flex-row justify-between">
          <div className="flex gap-6">
            <p className="text-lg font-medium">{formatPrice(salePrice)}</p>
            <span>:</span>
            <p className="text-lg font-medium">
              {formatPrice(totalOwed)}
              <span className="text-sm"> balance</span>
            </p>
          </div>
          <div>
            <p className="text-sm">
              Purchased: {format(new Date(created_at), "EEE, MMM, dd, yyyy")}
            </p>
          </div>
        </div>
      </div>
      {status !== "paid" ? (
        <div className="border border-stone-500 flex flex-col overflow-hidden">
          <Link
            className="group border-b border-stone-500 text-sm uppercase font-bold px-3 flex flex-grow items-center gap-2 hover:bg-stone-400 transition-all justify-center"
            href={`/account/purchases/edit/${saleId}`}
          >
            <FaPencilAlt />
            edit
          </Link>
          <div className="group flex flex-grow items-center justify-center hover:bg-stone-400">
            <DeletePurchase sale={sale} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
