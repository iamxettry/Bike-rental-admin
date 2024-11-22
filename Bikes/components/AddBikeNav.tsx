"use client";
import { useModal } from "@/hooks/useModalStore";
import { Button } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { defaultBikeValues } from "../types/bikeSchema";
import SearchBikes from "./SearchBikes";

const AddBikeNav = () => {
  const { openDrawer } = useModal();
  const { reset } = useFormContext();

  const handleClick = () => {
    openDrawer();
    reset(defaultBikeValues);
  };
  return (
    <div className=" flex justify-between items-center">
      <SearchBikes />
      <Button
        variant="outlined"
        className="  !text-sm md:!text-base  !capitalize   hover:!text-primary !text-black   !border-primary  "
        onClick={handleClick}
      >
        <span>Add New Bike</span>
      </Button>
    </div>
  );
};

export default AddBikeNav;
