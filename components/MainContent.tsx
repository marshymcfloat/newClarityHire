"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { open, setOpen } = useSidebar();

  const handleMainClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <main
      className="overflow-hidden w-full p-2 lg:px-6"
      onClick={handleMainClick}
    >
      <SidebarTrigger className="mb-2" />

      <Card className="h-[95%] lg:h-[90%] lg:w-full shadow-2xl p-2">
        {children}
      </Card>
      <Toaster />
    </main>
  );
};
