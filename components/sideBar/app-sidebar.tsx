"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PieChart,
  ListOrdered,
  HandCoinsIcon,
  UserRound,
  Goal,
  Group,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoPrimary from "../shared/LogoPrimary";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/spendingSummary", label: "Spending", icon: HandCoinsIcon },
   { href: "/dashboard/spendingGoals", label: "Goals", icon: Goal },
  { href: "/dashboard/monthlyTrends", label: "Monthly Trends", icon: PieChart },
  { href: "/dashboard/transactions", label: "Transactions", icon: ListOrdered },
  { href: "/dashboard/allCategories", label: "Categories", icon: Group },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="bg-white">
      <SidebarHeader className="flex h-14 shrink-0 items-center border-b border-sidebar-border bg-white">
        <Link
          href="/dashboard"
          className={`flex h-full w-full items-center p-3 ${isCollapsed ? "justify-center p-1!" : ""}`}
        >
          {isCollapsed ? (
            <Image
              src="/svg/capitec-logo-minimal.svg"
              alt="Capitec"
              width={50}
              height={50}
              className="  object-contain"
            />
          ) : (
      <div className="w-full flex items-center justify-center"> <LogoPrimary ScalingWidth={100}/></div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
