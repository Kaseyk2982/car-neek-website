"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { usePurchase } from "./PurchaseContext";
import { isPast } from "date-fns";

export default function MyDatePicker({ pickupDate }) {
  const { selected, setSelected } = usePurchase();

  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={(date) => {
        if (date) {
          const noonDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            12,
            0,
            0,
          );
          setSelected(noonDate);
        } else {
          setSelected(date);
        }
      }}
      disabled={(curDate) => isPast(curDate)}
      footer={
        selected && selected instanceof Date
          ? `Selected: ${selected.toLocaleDateString()}`
          : "Pick a day."
      }
    />
  );
}
