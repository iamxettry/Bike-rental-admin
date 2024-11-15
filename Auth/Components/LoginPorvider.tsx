"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Login from "./Login";
import { defaultLoginValues, LoginSchema } from "../Schema/LoginSchema";

const LoginPorvider = () => {
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultLoginValues,
  });
  return (
    <FormProvider {...methods}>
      <Login />
    </FormProvider>
  );
};

export default LoginPorvider;
