import React, { useState } from "react";
import SupportServices from "../services/SupportServices"; // Adjust the import path as needed
import { FAQ } from "@/types/SupporTypes";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useModal } from "./useModalStore";
import { useStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";

const useFAQSubmit = () => {
  const { closeModal } = useModal();
  const [answer, setAnswer] = useState("");

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // Handle Submit for Creating or Updating FAQ
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    isEdit: boolean = false,
    faqId?: string
  ) => {
    e.preventDefault();

    // validate form data
    if (!(e.target as any).question.value) {
      toast.error("Question is required");
      return;
    }
    if (answer === "") {
      toast.error("Answer is required");
      return;
    }

    const formData: FAQ = {
      question: (e.target as any).question.value,
      answer: answer,
      status: (e.target as any).status.value,
    };

    const newPromise: Promise<string> = new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true);
        if (isEdit && faqId) {
          // Update FAQ
          const response = await SupportServices.updateFAQ(faqId, formData);
          console.log("FAQ updated successfully:", response.data);
          //   fetchFAQs(); // Refresh FAQs list after update
          queryClient.invalidateQueries({
            queryKey: ["faqs"],
          });
          resolve("FAQ updated successfully");
        } else {
          // Create FAQ
          const response = await SupportServices.postNewFAQ(formData);
          console.log("FAQ created successfully:", response.data);
          queryClient.invalidateQueries({
            queryKey: ["faqs"],
          }); // Refresh FAQs list after creation
          resolve("FAQ created successfully");
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
  const deleteFAQ = async (faqId: string) => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      const newPromise: Promise<string> = new Promise(
        async (resolve, reject) => {
          try {
            setIsLoading(true);
            await SupportServices.deleteFAQ(faqId);
            queryClient.invalidateQueries({
              queryKey: ["faqs"],
            }); // Refresh FAQs list after deletion
            resolve("FAQ deleted successfully");
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
        error: (err) => err || "Failed to delete FAQ",
      });
    }
  };

  return {
    faqs,
    isLoading,
    error,
    setFaqs,
    handleSubmit,
    answer,
    setAnswer,
    deleteFAQ,
  };
};

export default useFAQSubmit;
