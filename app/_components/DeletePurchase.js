"use client";

import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";

export default function DeletePurchase({ sale }) {
  return (
    <Modal>
      <Modal.Open opens="cancel">
        <button className="uppercase text-sm font-bold flex gap-2 items-center group px-3 hover:bg-stone-400 justify-center cursor-pointer">
          <FaTrashAlt />
          cancel
        </button>
      </Modal.Open>
      <Modal.Window name="cancel">
        <ConfirmDelete sale={sale} />
      </Modal.Window>
    </Modal>
  );
}
