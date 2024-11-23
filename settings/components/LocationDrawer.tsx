"use client";
import Drawer from "@/components/common/Drawer";
import { useModal } from "@/hooks/useModalStore";
import React from "react";
import LocationForm from "./LocationForm";

const LocationDrawer = () => {
  const { isDrawerOpen, closeDrawer, bikeId } = useModal();
  return (
    <>
      {isDrawerOpen && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          title={bikeId ? "Edit Location" : "Add New Location "}
          //   description={
          //     bikeId ? "Edit selected Bike" : "Add new  Bike to the system."
          //   }
        >
          <LocationForm />
        </Drawer>
      )}
    </>
  );
};

export default LocationDrawer;
