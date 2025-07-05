"use server";

import { schemaProduct } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { ProductStock } from "@prisma/client";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parse = schemaProduct.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    images: formData.getAll("images"),
  });
  
  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  const uploaded_images = parse.data.images as File[];
  const filenames = [];

  for (const image of uploaded_images) {
    const filename = await uploadFile(image, "products");
    filenames.push(filename);
  }

  try {
    await prisma.product.create({
      data: {
        name: parse.data.name,
        description: parse.data.description,
        price: Number(parse.data.price),
        category_id: Number(parse.data.category_id),
        location_id: Number(parse.data.location_id),
        brand_id: Number(parse.data.brand_id),
        stock: parse.data.stock as ProductStock,
        images: filenames,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to insert data product",
    };
  }
  return redirect("/dashboard/products");
}

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  return redirect("/dashboard/products");
}
