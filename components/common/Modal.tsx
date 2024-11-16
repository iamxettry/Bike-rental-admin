import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { Fragment } from "react";
import { LuXCircle } from "react-icons/lu";
import { AnimatePresence, delay, motion } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onClose={onClose}
            transition
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex items-center justify-end  bg-blue-600/40">
              <DialogPanel
                as={motion.div}
                initial={{ x: "100%" }}
                animate={{ x: "5%" }}
                exit={{ opacity: 0, x: "100%" }}
                className={`w-full max-w-lg p-4 pr-10 space-y-4 bg-white rounded-lg shadow-lg h-screen   overflow-y-auto  transition duration-400 ease-out data-[closed]:opacity-0  `}
              >
                <div className="shadow-[0px_4px_2px_-2px_rgba(0,0,0,0.1)] p-2">
                  <button onClick={onClose}>
                    <LuXCircle
                      size={24}
                      className=" text-gray-600 hover:text-red-500"
                    />
                  </button>
                </div>
                <div className="p-2">
                  <DialogTitle className="text-lg font-bold">
                    {title}
                  </DialogTitle>
                  <Description className="text-sm text-gray-500">
                    {description}
                  </Description>
                  <div>{children}</div>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
