import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../lib/prisma";
import { Product } from "@prisma/client";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function getProducts(type: "latest" | "best-selling" = "latest") {
  try {
    interface responseProducts {
      images: string[];
      id: number;
      name: string;
      category: {
        name: string;
      };
      price: bigint;
    }

    let products: responseProducts[] = [];

    if (type === "latest") {
      products = await prisma.product.findMany({
        orderBy: {
          created_at: "desc",
        },
        select: {
          images: true,
          id: true,
          name: true,
          category: {
            select: {
              name: true,
            },
          },
          price: true,
        },
      });
    } else if (type === "best-selling") {
      products = await prisma.product.findMany({
        orderBy: {
          orders: {
            _count: "desc",
          },
        },
        select: {
          images: true,
          id: true,
          name: true,
          category: {
            select: {
              name: true,
            },
          },
          price: true,
        },
      });
    }

    const response = products.map((item) => {
      return {
        ...item,
        image_url: getImageUrl(item.images[0], "products"),
      };
    });

    return response;
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        logo: true,
        id: true
      },
    });

    const response = brands.map((item) => {
      return {
        ...item,
        logo_url: getImageUrl(item.logo, "brands"),
      };
    });

    return response;
  } catch (error) {
    console.log(error);

    return [];
  }
}
