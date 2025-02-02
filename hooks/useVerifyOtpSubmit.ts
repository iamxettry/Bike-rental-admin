import { VerifyOtpSchemaType } from "@/Auth/Schema/LoginVerifySchema";
import { successResponse } from "@/Auth/types/common";
import AuthServices from "@/services/AuthServices";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

const useVerifyOtpSubmit = () => {
  const [otpExpired, setOtpExpired] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, setError, setValue, setFocus, formState } =
    useFormContext<VerifyOtpSchemaType>();
  const onSubmit: SubmitHandler<VerifyOtpSchemaType> = async (data) => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await AuthServices.verifyOtp(data);
          resolve(response);
        } catch (error) {
          if (error instanceof AxiosError && error.response?.data) {
            const errMsg = error?.response?.data;
            setError("otp", {
              type: "manual",
              message: errMsg?.detail || errMsg?.error,
            });
            reject(errMsg?.detail || errMsg?.error);
          } else if (error instanceof Error) {
            reject(error?.message);
          } else {
            reject("Network Error!!");
          }
        }
      }
    );

    await toast.promise(newPromise, {
      loading: "Sending OTP...",
      success: (response) => {
        router.push("/");
        sessionStorage.removeItem("email");
        return response.success || "OTP verified!";
      },
      error: (error) => {
        if (error === "OTP expired" || error === "OTP Tried too many times") {
          setOtpExpired(true);
        }
        setError("otp", {
          type: "manual",
          message: error,
        });
        return error;
      },
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    setError,
    formState,
    otpExpired,
    setOtpExpired,
    setFocus,
  };
};

export default useVerifyOtpSubmit;
