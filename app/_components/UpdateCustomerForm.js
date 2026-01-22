"use client";

import { updateCustomer } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

export default function UpdateCustomerForm({ customer }) {
  const { fullName, email, phoneNumber } = customer;

  return (
    <form
      action={updateCustomer}
      className="bg-slate-900 flex flex-col px-16 py-10 text-lg gap-5 mt-10"
    >
      <label htmlFor="fullName">Full name</label>
      <input
        type="text"
        name="fullName"
        id="fullName"
        defaultValue={fullName}
        disabled
        className="bg-slate-300 text-slate-700 py-3 px-5 disabled:bg-gray-500 cursor-not-allowed"
      />
      <label htmlFor="fullName">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        disabled
        defaultValue={email}
        className="bg-slate-300 text-slate-700 py-3 px-5 disabled:bg-gray-500 cursor-not-allowed"
      />
      <label htmlFor="fullName">
        Phone number{" "}
        <span className="text-sm text-slate-400">
          (US format e.g., 555-123-4567)
        </span>
      </label>
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        pattern="\+?[0-9\s\-\(\)]+"
        title="US phone number, e.g., 555-123-4567"
        maxLength="20"
        required
        defaultValue={phoneNumber}
        className="bg-slate-300 text-slate-700 py-3 px-5"
      />
      <div className="flex justify-end mt-4">
        <SubmitButton submittingLabel="Updating...">
          Update profile
        </SubmitButton>
      </div>
    </form>
  );
}
