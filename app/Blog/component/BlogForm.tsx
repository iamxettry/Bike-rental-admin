"use client";
import RHFTextField from "@/components/RHFComponents/RHFTextField";
import React, { useEffect } from "react";
import { BlogType } from "../Schema/BlogSchema";
import { Save, X } from "lucide-react";
import useBlogSubmit from "@/hooks/useBLogSubmit";
import { useModal } from "@/hooks/useModalStore";
import QuillEditor from "@/components/common/QuillEditor";
import RHFImageFieldWithPreview from "@/components/RHFComponents/RHFImageFieldWithPreview";

const BlogForm = () => {
  const { closeModal } = useModal();
  const {
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useBlogSubmit();
  useEffect(() => {
    const sub = watch((value) => console.log(value));
    return () => sub.unsubscribe();
  }, [watch]);
  return (
    <div className="bg-white p-4 rounded-md max-w-3xl mx-auto ">
      <form onSubmit={handleSubmit} className="grid space-y-4 overflow-y-auto ">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 space-y-4 ">
            <span></span>
            <RHFTextField<BlogType> name="title" label="Title" />
            {/* <RHFTextField<BlogType> name="description" label="Description" /> */}
            {/* image field  */}
            <div>
              <QuillEditor
                value={watch("description")}
                onChange={(value) => setValue("description", value)}
              />
              <p className="text-gray-500">Description</p>
            </div>
          </div>
          <RHFImageFieldWithPreview<BlogType>
            name="image"
            width={200}
            height={150}
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
