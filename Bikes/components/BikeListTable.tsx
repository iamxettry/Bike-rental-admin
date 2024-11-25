"use client";
import { Bike, BikeListResponse } from "../types/bikeApiTypes";
import { Switch } from "@headlessui/react";
import { LuEye, LuFileEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useModal } from "@/hooks/useModalStore";
import useBikeSubmit from "@/hooks/useBikeSubmit";

type BikeListTableProps = {
  data: BikeListResponse;
};

const BikeListTable = ({ data }: BikeListTableProps) => {
  const { handleFeaturedStatus, fetchAndSetBikeData, handleAvailableStatus } =
    useBikeSubmit();
  const { openDrawer, setEditId: setBikeId, openModal } = useModal();

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-300 ">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Color</th>
              <th className="px-6 py-4">Available Locations</th>
              <th className="px-6 py-4">Is Featured</th>
              <th className="px-6 py-4">Is Available</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: Bike, rowIndex: number) => (
              <tr
                key={rowIndex}
                className={`bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-pink-200 ${
                  rowIndex % 2 == 0 ? "" : ""
                } `}
              >
                <td className="px-6 py-4">{row.name ?? "-"}</td>
                <td className="px-6 py-4">{row.brand ?? "-"}</td>
                <td className="px-6 py-4">{row.color ?? "-"}</td>
                <td className="px-6 py-4">
                  {
                    <ul className="flex  gap-2 text-xs flex-wrap">
                      {row.locations.length > 0
                        ? row.locations.map((location, index) => (
                            <li key={index}>"{location}"</li>
                          ))
                        : "-"}
                    </ul>
                  }
                </td>
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
                <td className="px-6 py-4">
                  {row.isAvailable}
                  <Switch
                    checked={row.isAvailable}
                    onChange={() => handleAvailableStatus(row.id, row)}
                    className="group inline-flex h-5 w-9 items-center rounded-full bg-gray-400 transition data-[checked]:bg-primary"
                  >
                    <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-5" />
                  </Switch>
                </td>
                <td className="px-6 py-4 flex gap-3 items-center">
                  {/* <LuEye
                    size={20}
                    onClick={() => {
                      console.log(row.id);
                    }}
                    className="cursor-pointer text-primary/80 hover:text-primary"
                  /> */}
                  <button
                    type="button"
                    onClick={() => {
                      openDrawer();
                      setBikeId(row.id);
                      fetchAndSetBikeData(row.id);
                    }}
                  >
                    <LuFileEdit
                      size={20}
                      className="cursor-pointer text-green-600 hover:text-green-700"
                    />
                  </button>

                  <button
                    onClick={() => {
                      openModal();
                      setBikeId(row.id);
                    }}
                  >
                    <MdDelete
                      size={20}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BikeListTable;
