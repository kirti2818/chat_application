"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

const NxtProvider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NxtProvider;