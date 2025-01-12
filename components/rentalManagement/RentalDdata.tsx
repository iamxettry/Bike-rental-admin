"use client";

import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import RentalTable from "./RentalTable";
import { useQuery } from "@tanstack/react-query";
import RentalServices from "@/services/RentalServices";
import Search from "../common/Search";
import { ChevronDown } from "lucide-react";

const RentalDdata = () => {
  const {
    activeView,
    searchQuery,
    setIsLoading,
    setSearchQuery,
    isLoading: loading,
  } = useStore();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const [rental_status, setRentalStatus] = useState("");
  const [payment_status, setPaymentStatus] = useState("");
  const { data, isFetching } = useQuery({
    queryFn: async () =>
      await RentalServices.getRentals({
        rental: activeView,
        rental_status,
        payment_status,
        search_query: debouncedSearchQuery,
      }),
    queryKey: [
      "rentals",
      activeView,
      debouncedSearchQuery,
      rental_status,
      payment_status,
    ],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setSearchQuery("");
  }, []);
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount or search query change
    } else {
      setIsLoading(isFetching);
      setDebouncedSearchQuery("");
    }
  }, [searchQuery, isFetching]);
  return (
    <div className="">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100  flex gap-4">
        <div className="w-60">
          <Search placeholder="Search by ID, user, or bike..." />
        </div>
        <div className="flex gap-4">
          <div className="relative min-w-[150px]">
            <select
              value={rental_status}
              onChange={(e) => setRentalStatus(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 outline-none "
            >
              <option value="">--select rental status--</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="overdue">Overdue</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <div className="relative min-w-[150px]">
            <select
              value={payment_status}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 outline-none "
            >
              <option value="">-- select payment status--</option>

              <option value="pending"> Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </div>
      <RentalTable data={data} isLoading={loading} />
      
    </div>
  );
};

export default RentalDdata;
