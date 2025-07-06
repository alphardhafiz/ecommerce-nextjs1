"use client";

import { ActionResult } from "@/types";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";
import { Logout } from "../lib/actions";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const intiialState: ActionResult = {
  error: "",
};

export default function FormLogout() {
  const [state, formAction] = useFormState(Logout, intiialState);

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <form action={formAction}>
                <SidebarMenuButton tooltip={"Log out"}>
                  <LogOutIcon size={24} />
                  <span>Log out</span>
                </SidebarMenuButton>
              </form>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
