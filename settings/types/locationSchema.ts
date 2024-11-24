import { z } from "zod";

export const locationSchema = z.object({
  city: z.string().min(1, "City is required"),
});

export type LocationType = z.infer<typeof locationSchema>;

export const defaultLocation: LocationType = {
  city: "",
};

export type LocationListResponse = {
  id: string;
  city: string;
  created_at: string;
  updated_at: string;
};
