"use client";
import { successResponse } from "@/Auth/types/common";
import AuthServices from "@/services/AuthServices";
import { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();

  const handleLogout = () => {
    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await AuthServices.logoutUser();
          resolve(response);
        } catch (err) {
          if (err instanceof AxiosError && err.response?.data) {
            reject(err.response?.data?.detail || err.response?.data?.error);
          } else if (err instanceof Error) {
            reject(err.message);
          } else {
            reject("Network Error!!");
          }
        }
      }
    );

    toast.promise(newPromise, {
      loading: "Logging out...",
      success: (data) => {
        router.push("/");
        Cookies.remove("user_logged_in");
        Cookies.remove("user_id");
        return data?.success || "Logout successfully!";
      },
      error: (err) => {
        return err;
      },
    });
  };
  return (
    <div className="py-2  px-4 rounded-md bg-primary text-white mt-16  ">
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-semibold w-full  flex justify-between items-center cursor-pointer"
      >
        <h2 className="">Logout</h2>
        <LuLogOut />
      </button>
    </div>
  );
};

export default LogOut;
