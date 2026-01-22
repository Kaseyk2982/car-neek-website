"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("price", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filterValue = searchParams.get("price") ?? "all";

  return (
    <span className="flex justify-end mt-6 text-slate-200">
      <Button
        filter="all"
        handleFilter={handleFilter}
        filterValue={filterValue}
      >
        All vehicles
      </Button>
      <Button
        filter="low"
        handleFilter={handleFilter}
        filterValue={filterValue}
      >
        $80,000 or less
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        filterValue={filterValue}
      >
        $80,000 &mdash; $160,000
      </Button>
      <Button
        filter="high"
        handleFilter={handleFilter}
        filterValue={filterValue}
      >
        $160,000+
      </Button>
    </span>
  );
}

function Button({ children, filter, handleFilter, filterValue }) {
  return (
    <button
      className={`border border-stone-500 px-3 py-2 cursor-pointer hover:bg-slate-700 ${
        filterValue === filter ? "bg-slate-700" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
