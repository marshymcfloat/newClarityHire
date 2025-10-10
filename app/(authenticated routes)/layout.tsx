import { AppSidebar } from "@/components/AppSidebar";
import NextSessionProvider from "@/components/providers/NextSessionProvider";
import { Card } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextSessionProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="overflow-hidden w-screen  p-2  px-6  ">
            <SidebarTrigger className="mb-2" />
            <Card className="h-[95%] lg:h-[95%] lg:w-[98vw] shadow-2xl p-2">
              {children}
            </Card>
            <Toaster />
          </main>
        </SidebarProvider>
      </NextSessionProvider>
    </>
  );
};

export default CompanyLayout;
