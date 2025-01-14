"use client";

import { useState } from "react";
import BlogService from "@/services/BlogServices";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { BlogType } from "@/app/Blog/Schema/BlogSchema";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useModal } from "./useModalStore";
import { useQueryClient } from "@tanstack/react-query";

const useBlogSubmit = () => {
  const { editId, closeModal } = useModal();
  const [refreshKey, setRefreshKey] = useState(0);
  const { handleSubmit, setValue, formState, watch } =
    useFormContext<BlogType>();

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<BlogType> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.image) {
      formData.append("image", data.image);
    }
    const newPromise: Promise<string> = new Promise((resolve, reject) => {
      try {
        if (editId) {
          const response = BlogService.updateBlog(editId, formData);
          resolve("Blog updated successfully");
          closeModal();
          setRefreshKey((prev) => prev + 1);
          queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
        } else {
          const response = BlogService.createBlog(formData);
          resolve("Blog created successfully");
          closeModal();
          setRefreshKey((prev) => prev + 1);

          queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
        }
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
    });
    await toast.promise(newPromise, {
      loading: "Loading",
      success: (res) => res || "Blog added successfully",
      error: (err) => err || "Failed to add blog",
    });
  };

  const handleDelete = async (id: string) => {
    const newPromise: Promise<string> = new Promise((resolve, reject) => {
      try {
        const response = BlogService.deleteBlog(id);
        resolve("Blog deleted successfully");
        setRefreshKey((prev) => prev + 1);

        queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
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
    });
    await toast.promise(newPromise, {
      loading: "Loading",
      success: (res) => res || "Blog deleted successfully",
      error: (err) => err || "Failed to delete blog",
    });
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState,
    watch,
    setValue,
    editId,
    handleDelete,
    refreshKey,
    setRefreshKey,
  };
};

export default useBlogSubmit;
