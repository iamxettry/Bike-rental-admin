import { useModal } from "@/hooks/useModalStore";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";
import { LuXCircle } from "react-icons/lu";

type PropsType = {
  title: string;
  description: string;
  children: React.ReactNode;
};
const Modal = ({ title, description, children }: PropsType) => {
  const { isModalOpen, closeModal } = useModal();
  return (
    <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg p-6 space-y-4 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            {" "}
            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
            <button onClick={closeModal} className="">
              <LuXCircle size={24} className="hover:text-red-500" />
            </button>
          </div>
          <Description className="text-sm text-gray-500">
            {description}
          </Description>
          <div>{children}</div>
          {/* <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md"
            >
              Confirm
            </button>
          </div> */}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
