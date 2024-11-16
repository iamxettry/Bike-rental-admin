"use client";

import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModalStore";
import BikeFormProvider from "./BikeFormProvider";

const AddBikeDrawer = () => {
  const { isOpen, closeModal } = useModal();
  return (
    <div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title="Add New Bike "
          description="Add new  Bike to the system."
        >
          <BikeFormProvider />
        </Modal>
      )}
    </div>
  );
};

export default AddBikeDrawer;
