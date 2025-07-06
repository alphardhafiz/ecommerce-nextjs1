"use server";

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
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
  const parse = schemaProductEdit.safeParse({
    id: id,
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
  });

  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  const uploaded_images = formData.getAll("images") as File[];
  let filenames = product.images;
  if (uploaded_images.length === 3) {
    deleteFile("products", filenames);
    const parseImages = schemaProduct.pick({ images: true }).safeParse({
      images: uploaded_images,
    });

    if (!parseImages.success) {
      return {
        error: parseImages.error.errors[0].message,
      };
    }
    filenames = [];
    for (const image of uploaded_images) {
      const filename = await uploadFile(image, "products");
      filenames.push(filename);
    }
  }

  try {
    await prisma.product.update({
      where: {
        id: id,
      },
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
      error: "Failed to update data product",
    };
  }

  return redirect("/dashboard/products");
}

export async function deleteProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const product = await prisma.product.findFirst({
    where: {
      id
    },
    select: {
      images: true,
    }
  })

  if(!product) {
    return {
      error: "Product not found",
    };
  }

  try {
    await deleteFile("products", product.images);
    await prisma.product.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to delete product',
    }
  }
  
  return redirect("/dashboard/products");
}