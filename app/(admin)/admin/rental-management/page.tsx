import RentalDdata from "@/components/rentalManagement/RentalDdata";
import RentalQuickStats from "@/components/rentalManagement/RentalQuickStats";
import RentalViewTab from "@/components/rentalManagement/RentalViewTab";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Rental Management
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and monitor all bike rentals
          </p>
        </div>
      </div>
      <RentalQuickStats />

      {/* View Tabs */}
      <RentalViewTab />
      <RentalDdata />
    </div>
  );
};

export default page;
