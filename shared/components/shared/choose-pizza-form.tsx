'use client'

import { cn } from "@/shared/lib/utils"
import React from "react"
import { PizzaImage } from "./pizza-image"
import { Title } from "./title"
import { Button } from "../ui"
import { GroupVariants } from "./group-variants"
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza"
import { Ingredient, ProductItem } from "@prisma/client"
import { IngredientItem } from "./ingredient-item"
import { getPizzaDetails } from "@/shared/lib"
import { usePizzaOptions } from "@/shared/hooks"

interface Props {
  imageUrl: string
  name: string
  className?: string
  ingredients: Ingredient[]
  items: ProductItem[]
  onClickAddCart?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  className,
  ingredients,
  onClickAddCart,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items)

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  )

  const handleClick = () => {
    onClickAddCart?.()
    console.log({
      size,
      type,
      ingredients: ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .map((ingredient) => ingredient.name),
    })
  }

  return (
    <div className={cn("flex min-h-125 w-full", className)}>
      {/* Левая часть — картинка */}
      <div className="relative flex w-full flex-1 items-center justify-center">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      {/* Правая часть — информация и кнопка */}
      <div className="flex w-125 shrink-0 flex-col justify-start rounded-r-xl bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="mt-5 flex flex-col gap-4">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="scrollbar mt-5 h-105 overflow-auto rounded-md bg-gray-50 p-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClick}
          className="mt-10 h-13.75 w-full rounded-[18px] px-5 text-base"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
