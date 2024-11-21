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
  const { bikeId, setPreview, closeDrawer, isDrawerOpen, closeModal } =
    useModal();
  const watchImage = watch("image");
  const queryClient = useQueryClient();

  const { data, isFetched } = useQuery({
    queryFn: async () => await BikeServices.getBikeById(bikeId),
    queryKey: ["get-one-bike"],
    enabled: !!bikeId,
  });

  useEffect(() => {
    if (bikeId && data && isFetched) {
      setValue("name", data.name ?? "");
      setValue("brand", data.brand ?? "");
      setValue("model", data.model ?? "");
      setValue("year", data.year ?? 0);
      setValue("color", data.color ?? "");
      setValue("price", data.price ?? 0);
      setValue(
        "start",
        data.start as
          | "SELF_START_ONLY"
          | "KICK_AND_SELF_START"
          | "KICK_START_ONLY"
      ) ?? "SELF_START_ONLY",
        setValue("engine", data.engine ?? "");
      setValue("distance", data.distance ?? "");
      setValue("description", data.description ?? "");

      setPreview(data.image ?? null);
    } else {
      reset({
        name: "",
        brand: "",
        model: "",
        year: 2021,
        color: "",
        price: 0,
        start: "SELF_START_ONLY",
        engine: "",
        distance: "",
        description: "",
        image: null,
      });
      setPreview(null);
    }
  }, [bikeId, data]);

  // // Delete Bike
  const handleDeleteBike = async (id: string) => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await BikeServices.deleteBike(id);
          resolve(response);
          closeModal();
          queryClient.invalidateQueries({ queryKey: ["BikeList"] });
        } catch (error) {
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

    await toast.promise(newPromise, {
      loading: "Loading",
      success: (res) => res.success || "Bike deleted successfully",
      error: (err) => err || "Failed to delete bike",
    });
  };

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
    console.log("form data", data);
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          if (bikeId) {
            // Call update API for editing
            const response = await BikeServices.updateBike(bikeId, data);
            resolve(response);
          } else {
            // Call create API for adding new bike
            const response = await BikeServices.postBike(data);
            resolve(response);
          }
          closeDrawer();
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
    handleDeleteBike,
    reset,
  };
};

export default useBikeSubmit;
