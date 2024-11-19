"use client";

import { FormProvider, useForm } from "react-hook-form";
import BikeForm from "./BikeForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { bikeSchema, defaultBikeValues } from "../types/bikeSchema";

const BikeFormProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(bikeSchema),
    defaultValues: defaultBikeValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default BikeFormProvider;
