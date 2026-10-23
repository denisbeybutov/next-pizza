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
import { ProductForm } from "../product-form"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  
  
  

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "min-h-125 w-265 max-w-265 overflow-hidden bg-white p-0",
          className
        )}
      >
       <ProductForm product={product} onSubmit={()=>router.back()}/>
      </DialogContent>
    </Dialog>
  )
}
