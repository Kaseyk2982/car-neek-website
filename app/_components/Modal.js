"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const disableOutsideClick = name === "sale-form";

  const wrapperRef = disableOutsideClick ? null : useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-black-30 backdrop-blur-sm z-50 transition-all">
      <div
        ref={wrapperRef}
        className="fixed top-1/2 left-1/2 bg-slate-800 rounded-lg shadow-lg py-12 px-16 -translate-y-1/2 -translate-x-1/2 transition-all"
      >
        <button
          onClick={close}
          className="bg-none border-0 p-2 rounded-sm translate-x-3 transition-all absolute top-5 right-8 hover:bg-slate-600"
        >
          <HiXMark className="w-10 h-10 text-gray-700 hover:border hover:border-slate-300" />
        </button>
        <div>{cloneElement(children)}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
