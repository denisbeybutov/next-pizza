import { cn } from "@/shared/lib/utils";
import React from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items?: any[];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  className,
  ingredients,
  onClickAdd
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))

  const textDetails = "30 см, традиционное тесто";
  const totalPrice = 350;
  
  
  return (
    <div className={cn("flex w-full min-h-125", className)}>
      {/* Левая часть — картинка */}
      <div className="flex flex-1 items-center justify-center relative w-full ">
        <PizzaImage imageUrl={imageUrl} size={size}/>
      </div>

      {/* Правая часть — информация и кнопка */}
      <div className="flex w-125 shrink-0 flex-col justify-start bg-[#f7f6f5] p-7 rounded-r-xl">
        
          <Title
            text={name}
            size="md"
            className="mb-1 font-extrabold"
          />
          <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5">

          
          <GroupVariants
            items={pizzaSizes}
            value={String(size)}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={value => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-105 overflow-auto scrollbar mt-5">
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


        <Button className="h-13.75 w-full rounded-[18px] px-5 text-base mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
