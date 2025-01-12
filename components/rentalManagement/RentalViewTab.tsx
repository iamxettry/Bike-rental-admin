"use client";
import { useStore } from "@/store/store";
import { Bike, Calendar, CheckCircle, Clock } from "lucide-react";
import React, { useState } from "react";

//type
type RentalViewTabProps = {
  id: string;
  label: string;
  icon: any;
};

const rentalTabData: RentalViewTabProps[] = [
  { id: "all", label: "All Rentals", icon: Bike },
  { id: "active", label: "Active Rentals", icon: CheckCircle },
  { id: "history", label: "Rental History", icon: Clock },
];

const RentalViewTab = () => {
  const { activeView, setActiveView } = useStore();
  return (
    <>
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 max-w-2xl">
        {rentalTabData.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as typeof activeView)}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeView === tab.id
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default RentalViewTab;
