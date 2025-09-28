"use client";
import React, { ReactNode } from "react";
import MainLayout from "@/layouts/MainLayout";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
