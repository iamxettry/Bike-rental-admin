import { z } from "zod";
export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  image: z.instanceof(File).nullable().optional(),
});

export type BlogType = z.infer<typeof blogSchema>;

export const defaultBlogValues: BlogType = {
  title: "",
  description: "",
  image: null,
};
