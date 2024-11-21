"use client";
import React, { useEffect, useState } from "react";
import { Bike, BikeListResponse } from "../types/bikeApiTypes";
import { Switch } from "@headlessui/react";
import { LuDelete, LuEye, LuFileEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useModal } from "@/hooks/useModalStore";
import useBikeSubmit from "@/hooks/useBikeSubmit";
import { useQuery } from "@tanstack/react-query";
import BikeServices from "../services/BikeServices";

type BikeListTableProps = {
  data: BikeListResponse;
};

const BikeListTable = ({ data }: BikeListTableProps) => {
  const { handleFeaturedStatus, reset } = useBikeSubmit();
  const { openDrawer, bikeId, setBikeId, openModal, setPreview } = useModal();

  const { data: BikeData, isFetched } = useQuery({
    queryFn: async () => await BikeServices.getBikeById(bikeId),
    queryKey: ["get-one-bike"],
    enabled: !!bikeId,
  });

  // useEffect(() => {
  //   if (bikeId && BikeData && isFetched) {
  //     reset({
  //       name: BikeData.name ?? "",
  //       brand: BikeData.brand ?? "",
  //       model: BikeData.model ?? "",
  //       year: BikeData.year ?? 0,
  //       color: BikeData.color ?? "",
  //       price: BikeData.price ?? 0,
  //       start:
  //         (BikeData.start as
  //           | "SELF_START_ONLY"
  //           | "KICK_AND_SELF_START"
  //           | "KICK_START_ONLY") ?? "SELF_START_ONLY",
  //       engine: BikeData.engine ?? "",
  //       distance: BikeData.distance ?? "",
  //       description: BikeData.description ?? "",
  //       image: null,
  //     });
  //     setPreview(BikeData.image ?? null);
  //   } else if (!bikeId) {
  //     reset({
  //       name: "",
  //       brand: "",
  //       model: "",
  //       year: 2021,
  //       color: "",
  //       price: 0,
  //       start: "SELF_START_ONLY",
  //       engine: "",
  //       distance: "",
  //       description: "",
  //       image: null,
  //     });
  //     setPreview(null);
  //   }
  // }, [bikeId, BikeData, reset]);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-300 ">
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
                className={`bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-pink-200 ${
                  rowIndex % 2 == 0 ? "" : ""
                } `}
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
                <td className="px-6 py-4 flex gap-3 items-center">
                  <LuEye
                    size={20}
                    onClick={() => {
                      console.log(row.id);
                    }}
                    className="cursor-pointer text-primary/80 hover:text-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      openDrawer();
                      setBikeId(row.id);
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
