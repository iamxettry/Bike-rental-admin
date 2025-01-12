"use client";

import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import RentalTable from "./RentalTable";
import { useQuery } from "@tanstack/react-query";
import RentalServices from "@/services/RentalServices";
import { Search } from "lucide-react";

const RentalDdata = () => {
  const { activeView, searchQuery, setSearchQuery } = useStore();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const [rental_status, setRental_status] = useState("");
  const [payment_status, setPayment_status] = useState("");

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await RentalServices.getRentals({
        rental: activeView,
        rental_status,
        payment_status,
        search_query: debouncedSearchQuery,
      }),
    queryKey: ["rentals", activeView, debouncedSearchQuery],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount or search query change
  }, [searchQuery]);
  return (
    <div className="">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by ID, user, or bike..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <RentalTable data={data} isLoading={isLoading} />
    </div>
  );
};

export default RentalDdata;
