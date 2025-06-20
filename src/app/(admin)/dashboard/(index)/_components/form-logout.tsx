"use client"

import { ActionResult } from "@/types";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";
import { Logout } from "../lib/actions";

const intiialState: ActionResult = {
    error: ''
}

export default function FormLogout() {
const [state, formAction] = useFormState(Logout, intiialState)
    console.log({state})
  return (
    <form action={formAction}>
      <button className="flex gap-1 hover:bg-sidebar-accent hovet:text-sidebar-accent-foreground hover:rounded-xl p-2 hover:cursor-pointer w-full">
        <LogOutIcon size={24} />
        Log out
      </button>
    </form>
  );
}
