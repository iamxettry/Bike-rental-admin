"use client";

import { useStore } from "@/store/store";
import React from "react";
import RentalTable from "./RentalTable";
import { useQuery } from "@tanstack/react-query";
import RentalServices from "@/services/RentalServices";

const RentalDdata = () => {
  const { activeView } = useStore();

  const { data, isLoading } = useQuery({
    queryFn: async () => await RentalServices.getRentals(activeView),
    queryKey: ["rentals", activeView],
    refetchOnWindowFocus: false,
  });
  return (
    <div className="">
      <RentalTable data={data} isLoading={isLoading} />
    </div>
  );
};

export default RentalDdata;
