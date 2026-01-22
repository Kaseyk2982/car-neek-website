"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, submittingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-stone-400 text-slate-700 px-6 py-3 cursor-pointer hover:bg-stone-500 font-semibold"
      disabled={pending}
    >
      {pending ? submittingLabel : children}
    </button>
  );
}
