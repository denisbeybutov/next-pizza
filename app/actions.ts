'use server'

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOreder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if(!cartToken) {
      throw new Error('Cart token not found')
    }

    // находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      }
    });

    // если корзина не найдена возвращаем ошибку
    if(!userCart) {
      throw new Error('Cart not found')
    }

    // если корзину пуста возвращаем ошибку
    if(userCart?.totalAmount === 0) {
      throw new Error('Cart not found')
    }

    //создаем заказ
    const order = await prisma.order.create({
      data: {
        token:  cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      }
    })

    //очищаем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      }
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      }
    })

    //TODO сделать создание ссылки оплаты


  } catch (err){

  }
  

  return 'https://github.com/denisbeybutov/next-pizza/pull/7';
}