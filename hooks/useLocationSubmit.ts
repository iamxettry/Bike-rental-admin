import { successResponse } from "@/Auth/types/common";
import { LocationType } from "@/settings/types/locationSchema";
import { AxiosError } from "axios";
import { SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { useModal } from "./useModalStore";
import LocationService from "@/services/LocationServices";

const useLocationSubmit = () => {
  const { watch, handleSubmit, setError, formState } =
    useFormContext<LocationType>();
  const { closeDrawer } = useModal();

  const onSubmit: SubmitHandler<LocationType> = async (data) => {
    if (data.city === "") {
      setError("city", {
        type: "manual",
        message: "City Name is required",
      });
      return;
    }
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await LocationService.uploadLocation(data);
          resolve(response);
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
        return response?.success || "Location Added Successfully!";
      },
      error: (err) => err,
    });
  };
  return { handleSubmit: handleSubmit(onSubmit), watch, formState, onSubmit };
};

export default useLocationSubmit;
