"use client";
import Drawer from "@/components/common/Drawer";
import { useModal } from "@/hooks/useModalStore";
import React from "react";
import LocationForm from "./LocationForm";

const LocationDrawer = () => {
  const { isDrawerOpen, closeDrawer, editId: locationId } = useModal();
  return (
    <>
      {isDrawerOpen && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          title={locationId ? "Edit Location" : "Add New Location "}
          //   description={
          //     locationId ? "Edit selected Bike" : "Add new  Bike to the system."
          //   }
        >
          <LocationForm />
        </Drawer>
      )}
    </>
  );
};

export default LocationDrawer;
