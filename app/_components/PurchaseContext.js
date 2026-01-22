"use client";

import { createContext, useContext, useState } from "react";

const PurchaseContext = createContext();

const initialState = undefined;

function PurchaseProvider({ children }) {
  const [selected, setSelected] = useState(initialState);
  function resetSelected() {
    setSelected(() => initialState);
  }
  return (
    <PurchaseContext.Provider value={{ selected, setSelected, resetSelected }}>
      {children}
    </PurchaseContext.Provider>
  );
}

function usePurchase() {
  const context = useContext(PurchaseContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}
export { usePurchase, PurchaseProvider };
