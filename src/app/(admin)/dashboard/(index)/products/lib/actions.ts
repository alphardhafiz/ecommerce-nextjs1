"use server"

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";

export async function storeProduct(
    _:unknown,
    formData:FormData
): Promise<ActionResult>{
    return redirect('/dashboard/products')
}

export async function updateProduct(
    _:unknown,
    formData:FormData,
    id:number
): Promise<ActionResult>{
    return redirect('/dashboard/products')
}
