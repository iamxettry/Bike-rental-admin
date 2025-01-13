"use client";

import { useState } from "react";
import { BlogType } from "@/app/(admin)/admin/blogs/page";
import BlogService from "@/services/BlogServices";
import { SubmitHandler, useFormContext } from "react-hook-form";

const useBlogSubmit = () => {
  const { handleSubmit, formState , watch} = useFormContext<BlogType>();

  const onSubmit: SubmitHandler<BlogType> = async (data) => {
    console.log("data", data);
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState,
    watch
  };
};

export default useBlogSubmit;
