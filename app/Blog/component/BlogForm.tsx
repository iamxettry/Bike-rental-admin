"use client";
import RHFTextField from "@/components/RHFComponents/RHFTextField";
import React, { useEffect } from "react";
import { BlogType } from "../Schema/BlogSchema";
import RHFImageFieldWithPreview from "@/components/RHFComponents/RHFImageFieldWithPreview";
import { Save, X } from "lucide-react";
import useBlogSubmit from "@/hooks/useBLogSubmit";
import { useModal } from "@/hooks/useModalStore";

const BlogForm = () => {
  const { closeModal } = useModal();
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useBlogSubmit();
  useEffect(() => {
    const sub = watch((value) => console.log(value));
    return () => sub.unsubscribe();
  }, [watch]);
  return (
    <div className="bg-white p-4 rounded-md w-[500px] max-h-96 ">
      <form onSubmit={handleSubmit} className="grid space-y-4 overflow-y-auto ">
        <RHFTextField<BlogType> name="title" label="Title" />
        <RHFTextField<BlogType> name="description" label="Description" />
        <div className="flex flex-col items-start">
          <RHFImageFieldWithPreview<BlogType>
            name="image"
            label="Select Image"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              closeModal();
            }}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            <X className="h-4 w-4 inline mr-2" /> Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md ${
              isSubmitting
                ? "bg-gray-500 text-gray-300"
                : "bg-primary text-white hover:bg-primary/85"
            }`}
          >
            <Save className="h-4 w-4 inline mr-2" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
