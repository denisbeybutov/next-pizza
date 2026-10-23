"use client"

import { Dialog } from "@/shared/components/ui"
import { DialogContent } from "@/shared/components/ui/dialog"
import { useRouter } from "next/navigation"
import { cn } from "@/shared/lib/utils"
import React, { useState } from "react"
import { ChooseProductForm } from "../choose-product-form"
import { ProductWithRelations } from "@/@types/prisma"
import { ChoosePizzaForm } from "../choose-pizza-form"
import { useCartStore } from "@/shared/store"
import toast from "react-hot-toast"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)
  const addCartItem = useCartStore((state) => state.addCartItem)
  const loading = useCartStore((state) => state.loading)

  const onSubmit =  async (productItemId?: number, ingredients?: number[]) => {
    try{
      const itemId = productItemId ?? firstItem.id

      
        await addCartItem({
          productItemId: itemId,
          ingredients,
        })    
      
      toast.success(product.name + ' добавлен в корзину');
      router.back();
    } catch (error) {
      toast.error('Не удалось добавить товар в корзину')
      console.error(error)
    }
    
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "min-h-125 w-265 max-w-265 overflow-hidden bg-white p-0",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
