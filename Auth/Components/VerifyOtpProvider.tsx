"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import VerifyOtp from "./VerifyOtp";
import {
  defaultOtpVerifyValues,
  VerifyOtpSchema,
} from "../Schema/LoginVerifySchema";

const VerifyOtpProvider = () => {
  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: defaultOtpVerifyValues,
  });
  return (
    <FormProvider {...methods}>
      <VerifyOtp />
    </FormProvider>
  );
};

export default VerifyOtpProvider;
