"use client";
import React, { useState } from "react";
import { Bike, BikeListResponse } from "../types/bikeApiTypes";
import { Switch } from "@headlessui/react";

type BikeListTableProps = {
  data: BikeListResponse;
  handleFeaturedStatus: (id: string, status: Bike) => void;
};

const BikeListTable = ({ data, handleFeaturedStatus }: BikeListTableProps) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-300 ">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Model</th>
              <th className="px-6 py-4">Year</th>
              <th className="px-6 py-4">Is Featured</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: Bike, rowIndex: number) => (
              <tr
                key={rowIndex}
                className={`bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700`}
              >
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.model}</td>
                <td className="px-6 py-4">{row.year}</td>
                <td className="px-6 py-4">
                  {row.isFeatured}
                  <Switch
                    checked={row.isFeatured}
                    onChange={() => handleFeaturedStatus(row.id, row)}
                    className="group inline-flex h-5 w-9 items-center rounded-full bg-gray-400 transition data-[checked]:bg-primary"
                  >
                    <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-5" />
                  </Switch>
                </td>
                <td className="px-6 py-4">Edit DElete View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BikeListTable;
