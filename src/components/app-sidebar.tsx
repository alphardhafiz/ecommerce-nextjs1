"use client";

import * as React from "react";
import {
  Archive,
  Building,
  LayoutDashboardIcon,
  MapPin,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import FormLogout from "@/app/(admin)/dashboard/(index)/_components/form-logout";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: Archive,
    },
    {
      title: "Locations",
      url: "/dashboard/locations",
      icon: MapPin,
    },
    {
      title: "Brands",
      url: "/dashboard/brands",
      icon: Building,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
       <FormLogout />
      </SidebarFooter>
    </Sidebar>
  );
}
