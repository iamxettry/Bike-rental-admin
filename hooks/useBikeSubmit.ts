"use client";
import { successResponse } from "@/Auth/types/common";
import BikeServices from "@/Bikes/services/BikeServices";
import { Bike } from "@/Bikes/types/bikeApiTypes";
import { bikeType } from "@/Bikes/types/bikeSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { useModal } from "./useModalStore";
import LocationService from "@/services/LocationServices";
import { useEffect, useState } from "react";
import { LocationListResponse } from "@/settings/types/locationSchema";

const useBikeSubmit = () => {
  const [LocationOptions, setLocationOptions] = useState<
    { label: string; id: string }[]
  >([]);
  const { handleSubmit, watch, setValue, reset, formState } =
    useFormContext<bikeType>();
  const {
    editId: bikeId,
    setPreview,
    closeDrawer,
    closeModal,
    setEditId: setBikeId,
  } = useModal();
  const watchImage = watch("image");
  const queryClient = useQueryClient();
  const { data: locationList } = useQuery({
    queryKey: ["get-location-list"],
    queryFn: async () => await LocationService.getLocationList(),
    select: (data) => data,
  });
  useEffect(() => {
    if (locationList) {
      const mappedOptions = locationList?.map((item: LocationListResponse) => ({
        label: item.city,
        id: item.id,
      }));
      setLocationOptions(mappedOptions);
    }
  }, [locationList]);
  const fetchAndSetBikeData = async (bikeId: string) => {
    try {
      const bikeData = await BikeServices.getBikeById(bikeId); // Fetch bike data
      const {
        id,
        image,
        start,
        model,
        rating,
        engine,
        distance,
        locations,
        status,
        ...rest
      } = bikeData;

      if (image) {
        setPreview(image);
      }
      reset({
        ...rest,
        model: model ?? "",
        rating: rating ? parseFloat(rating) : undefined,
        engine: engine ?? "",
        distance: distance ?? "",
        start: start as
          | "SELF_START_ONLY"
          | "KICK_AND_SELF_START"
          | "KICK_START_ONLY",
        locations: locations?.map((item) => item.id),
        status: status as "AVAILABLE" | "MAINTENANCE" | "IN_USE" | "RESERVED",
      });
    } catch (error) {
      console.error("Error fetching bike data:", error);
    }
  };

  // // Delete Bike
  const handleDeleteBike = async (id: string) => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await BikeServices.deleteBike(id);
          resolve(response);
          closeModal();
          // Avoid refetching data for the deleted bike
          queryClient.removeQueries({
            queryKey: ["get-one-bike", id],
            exact: true,
          });
          // Invalidate the bike list to ensure the UI is updated
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
    await toast.promise(newPromise, {
      loading: "Loading",
      success: (res) => res.success || "Bike updated successfully",
      error: (err) => err || "Failed to update bike",
    });
  };
  const handleAvailableStatus = async (id: string, bike: Bike) => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await BikeServices.updateBikeAvailableStaus(id, {
            isAvailable: bike.isAvailable ? false : true,
            status: bike.isAvailable ? "MAINTENANCE" : "AVAILABLE",
          });
          resolve(response);
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
          setBikeId("");
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
    await toast.promise(newPromise, {
      loading: "Loading",
      success: (res) =>
        res.success
          ? res.success || "Bike added successfully"
          : "Bike update successfully",
      error: (err) =>
        err || bikeId ? "Failed to update Bike" : "Failed to add bike",
    });
  };
  return {
    handleSubmit: handleSubmit(onSubmit),
    watch,
    formState,
    handleFeaturedStatus,
    handleAvailableStatus,
    handleDeleteBike,
    reset,
    fetchAndSetBikeData,
    LocationOptions,
  };
};

export default useBikeSubmit;
