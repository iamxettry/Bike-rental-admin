import { z } from "zod";

export const bikeSchema = z
  .object({
    name: z.string(),
    rating: z.number().optional(),
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    color: z.string(),
    features: z.object({
      start: z.string().min(1, "Start is required"),
      engine: z.string(),
      distance: z.string(),
    }),
    price: z.number(),
    description: z.string().optional(),
    image: z.instanceof(File).optional(),
    date: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.image && data.image.size > 1024 * 1024 * 2) {
        return false;
      }
      return true;
    },
    {
      message: "Image size should be less than 2MB",
      path: ["image"],
    }
  );
// .refine(
//   (data) => {
//     if (data.image && !data.image.type.startsWith("image")) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: "File should be an image",
//     path: ["image"],
//   }
// );

export type bikeType = z.infer<typeof bikeSchema>;

export const defaultBikeValues: bikeType = {
  name: "",
  brand: "",
  model: "",
  year: 2021,
  color: "",
  features: {
    start: "",
    engine: "",
    distance: "",
  },
  price: 0,
  description: "",
  image: new File([], ""),
  date: "",
};
