"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { blogSchema, defaultBlogValues } from "../Schema/BlogSchema";

const BlogFormProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(blogSchema),
    defaultValues: defaultBlogValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default BlogFormProvider;
