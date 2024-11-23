"use client";
import { useModal } from "@/hooks/useModalStore";
import { Button } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { defaultLocation } from "../types/locationSchema";
import Search from "@/components/common/Search";

const LocationNav = () => {
  const { openDrawer } = useModal();
  const { reset } = useFormContext();

  const handleClick = () => {
    openDrawer();
    reset(defaultLocation);
  };
  return (
    <div className=" flex flex-col md:flex-row gap-4 justify-between items-center">
      <Search placeholder="Search Location" />
      <Button
        variant="outlined"
        className="  !text-sm md:!text-base  !capitalize   hover:!text-primary !text-black   !border-primary  "
        onClick={handleClick}
      >
        <span>Add New Location</span>
      </Button>
    </div>
  );
};

export default LocationNav;
