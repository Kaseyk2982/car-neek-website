import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/app/_utils/helpers";

export default function VehicleCard({ vehicle }) {
  const { id, image, make, model, year, regularPrice } = vehicle;

  return (
    <div className="grid grid-cols-3 border border-stone-600">
      <div className="flex-1 relative">
        <Link href={`/vehicles/${id}`}>
          <Image
            src={image}
            fill
            alt="vehicle-image"
            className="object-cover aspect-square border-r border-stone-600"
            quality={100}
          />
        </Link>
      </div>
      <div className="col-span-2">
        <div className="pt-4 pb-4 px-7 bg-slate-950">
          <h3 className="text-2xl text-stone-500 font-semibold mb-3">
            {make} {model}
          </h3>
          <div>
            <p>{year}</p>
          </div>
          <p className="flex justify-end text-2xl text-slate-200">
            {formatPrice(regularPrice)}
          </p>
        </div>
        <div className="flex border-t border-stone-600 px-8 py-3">
          <Link
            href={`/vehicles/${id}`}
            className="ml-auto text-xl px-3 py-2 bg-slate-950 hover:bg-slate-700 text-stone-400 font-semibold transition-all"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
}
