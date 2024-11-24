import { successResponse } from "@/Auth/types/common";
import { LocationType } from "@/settings/types/locationSchema";
import { AxiosError } from "axios";
import { SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { useModal } from "./useModalStore";
import LocationService from "@/services/LocationServices";
import { useQueryClient } from "@tanstack/react-query";

const useLocationSubmit = () => {
  const { watch, handleSubmit, reset, setError, formState } =
    useFormContext<LocationType>();
  const { closeDrawer, closeModal, editId, setEditId } = useModal();

  const queryClient = useQueryClient();

  // fetch and set locatin data
  const fetchAndSetLocationData = async (locationId: string) => {
    try {
      const bikeData = await LocationService.getLocationById(locationId); // Fetch location data
      reset(bikeData);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // // Delete Location
  const handleDeleteLocation = async (id: string) => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await LocationService.deleteLocation(id);
          resolve(response);
          closeModal();

          // Invalidate the bike list to ensure the UI is updated
          queryClient.invalidateQueries({ queryKey: ["get-location-list"] });
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
      success: (res) => res.success || "Location deleted successfully",
      error: (err) => err || "Failed to Location bike",
    });
  };

  const onSubmit: SubmitHandler<LocationType> = async (data) => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          if (editId) {
            const response = await LocationService.updateLocation(editId, data);
            resolve(response);
          } else {
            const response = await LocationService.uploadLocation(data);
            resolve(response);
          }
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError && error.response?.data?.detail) {
            const errMsg = error?.response?.data?.detail;
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
      loading: "Uploading...",
      success: (response) => {
        closeDrawer();
        setEditId("");
        queryClient.invalidateQueries({ queryKey: ["get-location-list"] });
        return response?.success || "Location Added Successfully!";
      },
      error: (err) => err,
    });
  };
  return {
    handleSubmit: handleSubmit(onSubmit),
    watch,
    formState,
    fetchAndSetLocationData,
    handleDeleteLocation,
  };
};

export default useLocationSubmit;
