"use client";
import Sidebar from "@/app/components/main/Sidebar/Sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <main className="xl:bg-tp-primary grid scroll-mt-14 xl:grid-cols-[auto_1fr]">
      <Sidebar />
      <section className="main_section h-[100dvh] overflow-y-auto bg-white xl:rounded-ss-2xl">
        {children}
      </section>
    </main>
  );
};

export default MainLayout;
