"use client";

import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import RentalTable from "./RentalTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RentalServices from "@/services/RentalServices";
import Search from "../common/Search";
import { ChevronDown, XCircle } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";
import toast from "react-hot-toast";

const RentalDdata = () => {
  const {
    activeView,
    searchQuery,
    setIsLoading,
    setSearchQuery,
    isLoading: loading,
    rentalData,
    offset,
    setCurrentPage,
    setOffset,
  } = useStore();
  const { isModalOpen, closeModal } = useModal();
  const queryClient = useQueryClient();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const [rental_status, setRentalStatus] = useState("");
  const [payment_status, setPaymentStatus] = useState("");

  const [updatedRentalStatus, setUpdatedRentalStatus] = useState("");
  const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState("");
  const { data, isFetching } = useQuery({
    queryFn: async () =>
      await RentalServices.getRentals({
        rental: activeView,
        rental_status,
        payment_status,
        search_query: debouncedSearchQuery,
        offset,
        limit: 5,
      }),
    queryKey: [
      "rentals",
      activeView,
      debouncedSearchQuery,
      rental_status,
      payment_status,
      closeModal,
      offset,
    ],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setSearchQuery("");
    closeModal();
    setCurrentPage(1);
    setOffset(0);
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

  const handleUpdateStatus = async () => {
    const newPromise: Promise<string> = new Promise(async (resolve, reject) => {
      try {
        const response = await RentalServices.updateRentalStatus(
          rentalData.id,
          {
            rental_status: updatedRentalStatus
              ? updatedRentalStatus
              : rentalData.rental_status,
            payment_status: updatedPaymentStatus
              ? updatedPaymentStatus
              : rentalData.payment_status,
          }
        );
        closeModal();

        // refetch data
        queryClient.invalidateQueries({
          queryKey: ["rentals"],
        });
        resolve(response?.message);
      } catch (error) {
        console.log(error);
        reject("Something went wrong");
      }
    });
    await toast.promise(newPromise, {
      loading: "Updating rental status...",
      success: (message) => message || "Rental status updated successfully",
      error: (err) => err || "Failed to update rental status",
    });
  };
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
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Edit Rental</h3>
              <button
                onClick={() => closeModal()}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            {/* Add your edit form here */}
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 outline-none"
                  onChange={(e) => setUpdatedRentalStatus(e.target.value)}
                  defaultValue={rentalData.rental_status}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="overdue">Overdue</option>
                </select>
                <ChevronDown
                  className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Status
                </label>
                <select
                  className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 outline-none"
                  onChange={(e) => setUpdatedPaymentStatus(e.target.value)}
                  defaultValue={rentalData.payment_status}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
                <ChevronDown
                  className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => closeModal()}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalDdata;
