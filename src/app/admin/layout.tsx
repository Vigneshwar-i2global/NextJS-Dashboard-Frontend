"use client";
import React, { ReactNode } from "react";
import Sidemenu from "../components/main/Sidebar/Sidebar";
import '../globals.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <Sidemenu>{children}</Sidemenu>;
}
