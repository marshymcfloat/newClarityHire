"use client";

import { Briefcase, ClipboardList } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import UserButton from "./App Sidebar/UserButton";
import { useParams } from "next/navigation";

export function AppSidebar() {
  const { companySlug } = useParams();

  console.log(companySlug);

  const items = [
    {
      title: "Available jobs",
      url: `/${companySlug}/available-jobs`,
      icon: Briefcase,
    },
    {
      title: "Job Applications",
      url: `/${companySlug}/job-applications`,
      icon: ClipboardList,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-2 lg:mb-1">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
