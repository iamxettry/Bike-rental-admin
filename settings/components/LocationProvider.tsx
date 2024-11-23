"use client";

import { FormProvider, useForm } from "react-hook-form";

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default LocationProvider;
