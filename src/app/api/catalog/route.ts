import { TFilter } from "@/hooks/useFilter";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { TProduct } from "@/types";
import { getImageUrl } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const res = (await request.json()) as TFilter;

    const filters: Prisma.ProductWhereInput = {};

    if (res.search && res.search !== "") {
      filters.name = {
        contains: res.search,
        mode: "insensitive",
      };
    }

    if (res.minPrice || res.maxPrice) {
      filters.price = {};
      if (res.minPrice) {
        filters.price.gte = res.minPrice;
      }
      if (res.maxPrice) {
        filters.price.lte = res.maxPrice;
      }
    }

    if (res.stock?.length) {
      filters.stock = { in: res.stock };
    }

    if (res.brands?.length) {
      filters.brand = { id: { in: res.brands } };
    }

    if (res.categories?.length) {
      filters.category = { id: { in: res.categories } };
    }

    if (res.locations?.length) {
      filters.location = { id: { in: res.locations } };
    }

    const products = await prisma.product.findMany({
      where: filters,
      select: {
        id: true,
        images: true,
        name: true,
        category: { select: { name: true } },
        price: true,
      },
    });
    
    const response: TProduct[] = products.map((product) => {
      return {
        id: product.id,
        category_name: product.category.name,
        image_url: getImageUrl(product.images[0], "products"),
        name: product.name,
        price: Number(product.price),
      };
    });

    return Response.json(response);
  } catch (error) {
    console.log("[CATALOG_POST]", error);
    return Response.json({ status: false }, { status: 500 });
  }
}
