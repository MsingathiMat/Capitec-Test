"use client";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import { Header } from "@/components/sideBar/header";
import { Footer } from "@/components/sideBar/footer";
import { AppSidebar } from "@/components/sideBar/app-sidebar";
import { ReduxProvider } from "@/components/ReduxProviderWrapper";
import { useCustomerProfileQuery } from "@/redux/services/queryCustomerProfile";
import { Users } from "@/constants/users";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useCustomerProfileQuery({ customerId: Users.JohnUserId })
  return (

   
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  
  );
}
