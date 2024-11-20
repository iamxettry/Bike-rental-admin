"use client";

import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModalStore";
import BikeForm from "./BikeForm";

const AddBikeDrawer = () => {
  const { isOpen, closeModal, editId } = useModal();
  return (
    <div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title={editId ? "Edit Bike" : "Add New Bike "}
          description={
            editId ? "Edit selected Bike" : "Add new  Bike to the system."
          }
        >
          <BikeForm />
        </Modal>
      )}
    </div>
  );
};

export default AddBikeDrawer;
