"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  defaultLocation,
  locationSchema,
  LocationType,
} from "../types/locationSchema";

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<LocationType>({
    mode: "all",
    resolver: zodResolver(locationSchema),
    defaultValues: defaultLocation,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default LocationProvider;
