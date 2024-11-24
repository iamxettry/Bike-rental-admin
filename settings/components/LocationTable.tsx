"use client";
import { LuFileEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useModal } from "@/hooks/useModalStore";
import { LocationListResponse } from "../types/locationSchema";
import useLocationSubmit from "@/hooks/useLocationSubmit";

type BikeListTableProps = {
  data: LocationListResponse[];
};

const LocationTable = ({ data }: BikeListTableProps) => {
  const { fetchAndSetLocationData } = useLocationSubmit();
  const { openDrawer, setEditId: setLocationid, openModal } = useModal();

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-300 ">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: LocationListResponse, rowIndex: number) => (
              <tr
                key={rowIndex}
                className={`bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-pink-200 ${
                  rowIndex % 2 == 0 ? "" : ""
                } `}
              >
                <td className="px-6 py-4">{row.city ?? "-"}</td>

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
                      setLocationid(row.id);
                      fetchAndSetLocationData(row.id);
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
                      setLocationid(row.id);
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

export default LocationTable;
