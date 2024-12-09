"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RHFTextField from "../../components/RHFComponents/RHFTextField";
import Loading from "@/components/utils/Loading";
import { useSearchParams } from "next/navigation";
import { successResponse } from "../types/common";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import useVerifyOtpSubmit from "@/hooks/useVerifyOtpSubmit";
import AuthServices from "@/services/AuthServices";
import { VerifyOtpSchemaType } from "../Schema/LoginVerifySchema";
import RHFNumberField from "@/components/RHFComponents/RHFNumberField1";

const VerifyOtp = () => {
  const searchParams = useSearchParams();
  const verifyOtp = searchParams.get("verifyOtp");
  const forgotPassword = searchParams.get("forgotPassword");
  const [verifyLoginOtpMode, setVerifyLoginOtpMode] = useState(true);
  const [email, setEmail] = useState("");
  const {
    handleSubmit,
    onSubmit,
    setValue,
    setError,
    formState: { isSubmitting },
    otpExpired,
    setOtpExpired,
    setFocus,
  } = useVerifyOtpSubmit();
  useEffect(() => {
    setVerifyLoginOtpMode(true);
    if (verifyOtp && forgotPassword) {
      setVerifyLoginOtpMode(false);
    }
  }, [verifyOtp, forgotPassword]);
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setValue("email", email);
      setEmail(email);
      setFocus("otp");
    }
  }, [setValue]);
  const handleResendLoginOtp = async () => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await AuthServices.resendOtp({ email });
          resolve(response);
        } catch (error) {
          if (error instanceof AxiosError && error.response?.data) {
            const errMsg = error?.response?.data;
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
        setOtpExpired(false);
        setValue("otp", "");
        setError("otp", {});
        return response.success || "OTP sent to your email!";
      },
      error: (error) => {
        return error;
      },
    });
  };
  return (
    <>
      <form
        className="flex flex-col gap-4 mt-4 p-4 pt-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Username field */}
        <RHFTextField<VerifyOtpSchemaType> name="email" label="Email" />
        <RHFNumberField<VerifyOtpSchemaType> name="otp" label="Otp" />

        {/* Otp Expired */}
        {otpExpired && (
          <div className=" flex justify-end">
            <button type="button" onClick={handleResendLoginOtp}>
              <span className="text-primary hover:text-red-500 hover:underline">
                Resend OTP
              </span>
            </button>
          </div>
        )}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-3 rounded-lg font-bold text-lg  flex justify-center
              ${
                isSubmitting
                  ? "bg-black/40 text-white"
                  : "bg-primary text-white"
              }
            `}
          >
            {isSubmitting ? <Loading msg="Sending.." /> : "Send"}
          </button>
        </div>
      </form>
    </>
  );
};

export default VerifyOtp;
