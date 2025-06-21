"use server";

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";

export async function postCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  console.log(formData.get("name"));
  const validate = schemaCategory.safeParse({ name: formData.get("name") });
  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }
  return redirect("/dashboard/categories");
}

export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined
) {
  console.log(formData.get("name"), id);
  const validate = schemaCategory.safeParse({ name: formData.get("name") });
  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }
  return redirect("/dashboard/categories");
}
