import React, { useState } from "react";
import SupportServices from "../services/SupportServices"; // Adjust the import path as needed
import { FAQ, ReportIssue, SystemAlert } from "@/types/SupporTypes";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useModal } from "./useModalStore";
import { useStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";

const useSystemAlertSubmit = () => {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // Handle Submit for Creating or Updating FAQ
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    isEdit: boolean = false,
    alertId?: string
  ) => {
    e.preventDefault();

    // validate form data
    if (!(e.target as any).title.value) {
      toast.error("Title is required");
      return;
    }
    if (!(e.target as any).description.value) {
      toast.error("Description is required");
      return;
    }

    const formData: SystemAlert = {
      status: (e.target as any).status.value,
      title: (e.target as any).title.value,
      description: (e.target as any).description.value,
    };

    const newPromise: Promise<string> = new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true);
        if (isEdit && alertId) {
          // Update FAQ
          const response = await SupportServices.updateSystemAlert(
            alertId,
            formData
          );
          queryClient.invalidateQueries({
            queryKey: ["systemAlerts"],
          });
          resolve("Alert updated successfully");
        } else {
          // Create FAQ
          const response = await SupportServices.postSystemAlert(formData);
          queryClient.invalidateQueries({
            queryKey: ["systemAlerts"],
          }); // Refresh FAQs list after creation
          resolve("Alert created successfully");
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data) {
          const errMsg =
            error?.response?.data?.detail || error?.response?.data?.data;
          setError(errMsg);
          reject(errMsg);
        } else if (error instanceof Error) {
          reject(error?.message);
          setError(error.message);
        } else {
          setError("Network Error!!");
          reject("Network Error!!");
        }
      } finally {
        closeModal();
        setIsLoading(false);
      }

      await toast.promise(newPromise, {
        loading: "Loading..",
        success: (res) => res,
        error: (err) => err || "Failed to create/update Aleert",
      });
    });
  };

  const deleteAlert = async (alertId: string) => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      const newPromise: Promise<string> = new Promise(
        async (resolve, reject) => {
          try {
            setIsLoading(true);
            await SupportServices.deleteSystemAlert(alertId);
            queryClient.invalidateQueries({
              queryKey: ["systemAlerts"],
            }); // Refresh FAQs list after deletion
            resolve("Alert deleted successfully");
          } catch (error) {
            if (error instanceof AxiosError && error.response?.data) {
              const errMsg =
                error?.response?.data?.detail || error?.response?.data?.data;
              setError(errMsg);
              reject(errMsg);
            } else if (error instanceof Error) {
              reject(error?.message);
              setError(error.message);
            } else {
              setError("Network Error!!");
              reject("Network Error!!");
            }
          } finally {
            setIsLoading(false);
          }
        }
      );
      await toast.promise(newPromise, {
        loading: "Loading..",
        success: (res) => res,
        error: (err) => err || "Failed to delete Alert",
      });
    }
  };

  return {
    isLoading,
    error,
    handleSubmit,
    deleteAlert,
  };
};

export default useSystemAlertSubmit;
