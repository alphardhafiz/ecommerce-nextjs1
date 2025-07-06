import prisma from "../../../../../../../lib/prisma";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({});

    return orders;
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function getOrderById(id: number) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id,
      },
    });

    return order;
  } catch (error) {
    console.log(error);

    return null;
  }
}
