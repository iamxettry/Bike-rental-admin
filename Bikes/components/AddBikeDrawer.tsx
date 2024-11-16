"use client";

import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModalStore";

const AddBikeDrawer = () => {
  const { isOpen, closeModal } = useModal();
  return (
    <div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title="Add Bike ">
          Add
        </Modal>
      )}
    </div>
  );
};

export default AddBikeDrawer;
