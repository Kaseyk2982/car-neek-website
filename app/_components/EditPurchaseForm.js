"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "../_utils/helpers";
import MyDatePicker from "./MyDatePicker";
import SubmitButton from "./SubmitButton";
import { usePurchase } from "./PurchaseContext";
import updateSale from "../_lib/actions";
import { format, parseISO } from "date-fns";

export default function EditPurchaseFrom({ sale, vehicle }) {
  const { downPayment: currentDownPayment, pickupDate, id } = sale;
  const [downPayment, setDownPayment] = useState(
    Number(currentDownPayment) || 0,
  );

  const { regularPrice } = vehicle;
  const { selected, setSelected } = usePurchase();

  useEffect(() => {
    console.log("pickupDate:", pickupDate);
    if (pickupDate) {
      try {
        const date = parseISO(pickupDate);
        date.setHours(12, 0, 0, 0);
        setSelected(date);
        console.log("set selected to:", date.toLocaleDateString());
      } catch (error) {
        console.error("Error parsing pickupDate:", error);
        setSelected(new Date()); // fallback
      }
    } else {
      setSelected(undefined);
    }
  }, [pickupDate, setSelected]);

  const liveTotalOwed = regularPrice - downPayment;

  const pickupDateValue = selected ? selected.toISOString() : "";
  console.log(pickupDateValue);

  const updatedData = {
    id,
    liveTotalOwed,
  };

  return (
    <>
      <form
        action={updateSale.bind(null, updatedData)}
        className="bg-slate-900 flex flex-col px-16 py-10 text-lg gap-5 mt-10"
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
          onChange={(e) => {
            setDownPayment(Number(e.target.value));
          }}
          className="bg-slate-300 text-slate-900"
        />
        <label>Select pickup day</label>
        <div className="flex flex-col mx-auto">
          <MyDatePicker pickupDate={pickupDate} />

          <input type="hidden" name="pickupDate" value={pickupDateValue} />
        </div>
        <div className="ml-auto">
          <SubmitButton submittingLabel="Updating...">
            Update purchase
          </SubmitButton>
        </div>
      </form>
      <div className="bg-stone-400 px-6 py-4 flex justify-around text-xl text-slate-700 font-semibold">
        <span>Price {formatPrice(regularPrice)}</span>
        <span>Down Payment {formatPrice(downPayment)}</span>
        <span>Total Owed {formatPrice(liveTotalOwed)}</span>
      </div>
    </>
  );
}
