"use client"

import { Dialog } from "@/shared/components/ui"
import { DialogContent } from "@/shared/components/ui/dialog"
import { useRouter } from "next/navigation"
import { cn } from "@/shared/lib/utils"
import React, { useState } from "react"
import { ChooseProductForm } from "../choose-product-form"
import { ProductWithRelations } from "@/@types/prisma"
import { ChoosePizzaForm } from "../choose-pizza-form"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ 
  product,
  className
}) => {
  const router = useRouter()
  const isPizzaForm = Boolean(product.items[0].pizzaType)
  console.log(product)
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
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  )
}
