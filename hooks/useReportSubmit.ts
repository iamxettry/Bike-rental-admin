import React, { useState } from "react";
import SupportServices from "../services/SupportServices"; // Adjust the import path as needed
import { FAQ, ReportIssue } from "@/types/SupporTypes";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useModal } from "./useModalStore";
import { useStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";

const useReportSubmit = () => {
  const { closeModal } = useModal();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // Handle Submit for Creating or Updating FAQ
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    isEdit: boolean = false,
    reportId?: string
  ) => {
    e.preventDefault();

    // validate form data
    if (!(e.target as any).subject.value) {
      toast.error("Subject is required");
      return;
    }
    if (!(e.target as any).description.value) {
      toast.error("Description is required");
      return;
    }

    const formData: ReportIssue = {
      category: (e.target as any).category.value,
      subject: (e.target as any).subject.value,
      description: (e.target as any).description.value,
    };

    const newPromise: Promise<string> = new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true);
        if (isEdit && reportId) {
          // Update FAQ
          const response = await SupportServices.updateReportIssue(
            reportId,
            formData
          );
          queryClient.invalidateQueries({
            queryKey: ["reportedIssues"],
          });
          resolve("Report updated successfully");
        } else {
          // Create FAQ
          const response = await SupportServices.postReportIssue(formData);
          console.log("FAQ created successfully:", response.data);
          queryClient.invalidateQueries({
            queryKey: ["reportedIssues"],
          }); // Refresh FAQs list after creation
          resolve("Report created successfully");
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

      toast.promise(newPromise, {
        loading: "Loading..",
        success: (res) => res,
        error: (err) => err || "Failed to create/update FAQ",
      });
    });
  };

  // Fetch FAQs
  //   const fetchFAQs = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await SupportServices.getFAQs();
  //       setFaqs(response.data);
  //     } catch (err: any) {
  //       setError(err.message || "Failed to fetch FAQs");
  //       console.error("Error:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  // Delete FAQ
  const deleteReport = async (reportId: string) => {
    const newPromise: Promise<string> = new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true);
        await SupportServices.deleteReportIssue(reportId);
        queryClient.invalidateQueries({
          queryKey: ["reportedIssues"],
        }); // Refresh FAQs list after deletion
        resolve("Issue deleted successfully");
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
    });
    toast.promise(newPromise, {
      loading: "Loading..",
      success: (res) => res,
      error: (err) => err || "Failed to delete Issue",
    });
  };

  return {
    faqs,
    isLoading,
    error,
    setFaqs,
    handleSubmit,
    deleteReport,
  };
};

export default useReportSubmit;
