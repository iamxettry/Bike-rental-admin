import { z } from "zod";

export const bikeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.number().optional(),
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  color: z.string(),
  start: z.enum(["SELF_START_ONLY", "KICK_AND_SELF_START", "KICK_START_ONLY"]), // enum
  engine: z.string(),
  distance: z.string(),
  isFeatured: z.boolean(),
  price: z.number().min(500, "Price must be greater than 500"),
  description: z.string().optional(),
  image: z.instanceof(File).nullable().optional(), // Allow null for image
  date: z.string().optional(),
});

export type bikeType = z.infer<typeof bikeSchema>;

export const defaultBikeValues: bikeType = {
  name: "",
  brand: "",
  model: "",
  year: 2021,
  color: "",
  start: "SELF_START_ONLY",
  engine: "",
  distance: "",
  isFeatured: false,
  price: 0,
  description: "",
  image: new File([], ""),
  date: new Date().toISOString(),
};
