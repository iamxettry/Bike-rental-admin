"use client";

import { useModal } from "@/hooks/useModalStore";
import BikeForm from "./BikeForm";
import Drawer from "@/components/common/Drawer";

const AddBikeDrawer = () => {
  const { isDrawerOpen, closeDrawer, bikeId } = useModal();
  return (
    <>
      {isDrawerOpen && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          title={bikeId ? "Edit Bike" : "Add New Bike "}
          description={
            bikeId ? "Edit selected Bike" : "Add new  Bike to the system."
          }
        >
          <BikeForm />
        </Drawer>
      )}
    </>
  );
};

export default AddBikeDrawer;
