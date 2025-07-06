import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
        include: {
            user: true,
            products: {
                include: {
                    product: true
                }
            },
        }
    })

    const response: TColumn[] = orders.map((order) => {
        return {
            id: order.id,
            customer_name: order.user.name,
            price: Number(order.total),
            product: order.products.map((product) => {
                return {
                    name: product.product.name,
                    image: getImageUrl(product.product.images[0])
                }
            }),
            status: order.status
        }
    })

    return response;
  } catch (error) {
    console.log(error);

    return [];
  }
}
