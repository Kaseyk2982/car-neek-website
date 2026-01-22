"use client";

import { useState } from "react";

export default function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const text = String(children);
  const words = text.trim().split(/\s+/);
  const limit = 40;

  const needsExpansion = words.length > limit;

  const truncated =
    words.slice(0, limit).join(" ") + (needsExpansion ? "..." : "");

  const displayText = isExpanded ? text : truncated;

  if (!needsExpansion) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {displayText}{" "}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="text-slate-600 underline ml-3 cursor-pointer"
      >
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </span>
  );
}
