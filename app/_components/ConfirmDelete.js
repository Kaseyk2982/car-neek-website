"use client";

import { deletePurchase } from "@/app/_lib/actions";
import { useTransition } from "react";

export default function ConfirmDelete({ sale }) {
  const {
    id: saleId,
    vehicles: { make, model, id: vehicleId },
  } = sale;

  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => deletePurchase(saleId, vehicleId));
  }

  return (
    <div className="flex flex-col gap-4 py-8">
      <h2 className="text-2xl text-slate-300">
        Are you sure you want to cancel this {make} {model} purchase?
      </h2>
      <div className="flex justify-center">
        <button
          onClick={handleDelete}
          className={`px-8 py-3 rounded-md text-xl uppercase  transition-all cursor-pointer ${isPending ? "bg-gray-600 cursor-not-allowed" : "bg-red-800 hover:bg-red-600"}`}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
