"use server";

import { schemaBrand } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";

export async function postBrand(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaBrand.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
  });
  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  console.log(formData.get("name"));
  console.log(formData.get("image"));

  return redirect("/dashboard/brands");
}
