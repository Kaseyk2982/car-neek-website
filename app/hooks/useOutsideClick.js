"use client";
import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const wrapperRef = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return wrapperRef;
}
