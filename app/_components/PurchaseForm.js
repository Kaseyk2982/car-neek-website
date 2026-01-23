"use client";

import { useState } from "react";
import { formatPrice } from "@/app/_utils/helpers";
import MyDatePicker from "./MyDatePicker";
import { usePurchase } from "./PurchaseContext";
import { createSale } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

export default function PurchaseForm({ vehicle, user }) {
  const { selected, resetSelected } = usePurchase();
  const [downPayment, setDownPayment] = useState(0);
  const { regularPrice, id } = vehicle;
  const salePrice = regularPrice;
  const totalOwed = regularPrice - downPayment;
  const status = totalOwed === 0 ? "paid" : "pending";
  const pickupDate = selected;

  const saleData = {
    salePrice,
    status,
    pickupDate,
    vehicleId: id,
  };

  const createSaleWithData = createSale.bind(null, saleData);

  return (
    <div className="border border-stone-700 mt-8 max-w-4xl mx-auto">
      <div className="bg-slate-800 px-12 py-3 flex justify-between items-center">
        <p className="text-xl">Logged in as</p>
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="h-8 rounded-md"
          />
          <p>{user.name}</p>
        </div>
      </div>
      <form
        action={async (formData) => {
          await createSaleWithData(formData);
          resetSelected();
          setDownPayment(0);
        }}
        className="bg-slate-900 flex flex-col px-16 py-10 text-lg gap-5"
      >
        <label htmlFor="downPayment">Down Payment</label>
        <span>{formatPrice(downPayment)}</span>
        <input
          type="range"
          name="downPayment"
          id="downPayment"
          min="0"
          step="1000"
          max={regularPrice}
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="bg-slate-300 text-slate-900"
        />
        <label>Select pickup day</label>
        <div className="flex flex-col mx-auto">
          <MyDatePicker />
        </div>
        <div className="ml-auto">
          <SubmitButton submittingLabel="Purchasing...">
            Purchase vehicle
          </SubmitButton>
        </div>
      </form>
      <div className="bg-stone-400 px-6 py-4 flex flex-col items-center  lg:flex-row justify-around text-xl text-slate-700 font-semibold">
        <span>Price {formatPrice(regularPrice)}</span>
        <span>Down Payment {formatPrice(downPayment)}</span>
        <span>Total Owed {formatPrice(totalOwed)}</span>
      </div>
    </div>
  );
}
