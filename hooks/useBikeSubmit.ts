"use client";
import { successResponse } from "@/Auth/types/common";
import BikeServices from "@/Bikes/services/BikeServices";
import { Bike } from "@/Bikes/types/bikeApiTypes";
import { bikeType } from "@/Bikes/types/bikeSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { useModal } from "./useModalStore";

const useBikeSubmit = () => {
  const { handleSubmit, watch, setValue, reset, formState } =
    useFormContext<bikeType>();
  const { editId, setPreview } = useModal();
  const watchImage = watch("image");
  const queryClient = useQueryClient();

  console.log("edit id", editId);
  const { data, isFetched } = useQuery({
    queryFn: async () => await BikeServices.getBikeById(editId),
    queryKey: ["get-one-bike"],
    enabled: !!editId,
  });

  useEffect(() => {
    if (data && isFetched) {
      setValue("name", data.name);
      setValue("brand", data.brand);
      setValue("model", data.model);
      setValue("year", data.year);
      setValue("color", data.color);
      setValue("price", data.price);
      setValue("start", data.start);
      setValue("engine", data.engine);
      setValue("distance", data.distance);
      setValue("description", data.description);
      setPreview(data.image);
    }
  }, [editId, data]);

  console.log("data", data);
  const handleFeaturedStatus = async (id: string, bike: Bike) => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await BikeServices.updateBikeFeaturedStatus(id, {
            isFeatured: bike.isFeatured ? false : true,
          });
          resolve(response);
          queryClient.invalidateQueries({ queryKey: ["BikeList"] });
        } catch (error) {
          console.log("error", error);
          if (error instanceof AxiosError && error.response?.data) {
            const errMsg =
              error?.response?.data?.detail || error?.response?.data?.data;
            reject(errMsg);
          } else if (error instanceof Error) {
            reject(error?.message);
          } else {
            reject("Network Error!!");
          }
        }
      }
    );
    toast.promise(newPromise, {
      loading: "Loading",
      success: (res) => res.success || "Bike updated successfully",
      error: (err) => err || "Failed to update bike",
    });
  };

  const onSubmit: SubmitHandler<bikeType> = async (data) => {
    // if not image is selected, set image to null
    if (!watchImage) {
      delete data.image;
    }

    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await BikeServices.postBike(data);
          resolve(response);
        } catch (error) {
          console.log("error", error);
          if (error instanceof AxiosError && error.response?.data) {
            const errMsg =
              error?.response?.data?.detail || error?.response?.data?.data;
            reject(errMsg);
          } else if (error instanceof Error) {
            reject(error?.message);
          } else {
            reject("Network Error!!");
          }
        }
      }
    );
    toast.promise(newPromise, {
      loading: "Loading",
      success: (res) => res.success || "Bike added successfully",
      error: (err) => err || "Failed to add bike",
    });
  };
  return {
    handleSubmit: handleSubmit(onSubmit),
    watch,
    formState,
    handleFeaturedStatus,
  };
};

export default useBikeSubmit;
