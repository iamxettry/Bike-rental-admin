"use client";
import PageTitle from "@/components/common/PageTitle";
import { useModal } from "@/hooks/useModalStore";
import { Button } from "@mui/material";
import React from "react";

const AddBikeNav = () => {
  const { openModal } = useModal();
  return (
    <div className=" flex justify-between items-center">
      <PageTitle title="Add Bike" />
      <Button
        variant="outlined"
        className="  !text-sm md:!text-base  !capitalize   hover:!text-primary !text-black   !border-primary  "
        onClick={openModal}
      >
        <span>Add New Bike</span>
      </Button>
    </div>
  );
};

export default AddBikeNav;
