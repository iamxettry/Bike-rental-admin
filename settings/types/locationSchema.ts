import { z } from "zod";

export const locationSchema = z.object({
  city: z.string().min(1),
});

export type LocationType = z.infer<typeof locationSchema>;

export const defaultLocation: LocationType = {
  city: "",
};
