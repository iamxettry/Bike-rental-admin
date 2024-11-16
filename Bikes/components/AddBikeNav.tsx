"use client";
import PageTitle from "@/components/common/PageTitle";
import { Button } from "@mui/material";
import React from "react";

const AddBikeNav = () => {
  return (
    <div className=" flex justify-between items-center">
      <PageTitle title="Add Bike" />
      <Button
        variant="outlined"
        className="!text-black  !text-sm md:!text-base  !capitalize !font-semibold "
      >
        Add New Bike
      </Button>
    </div>
  );
};

export default AddBikeNav;
