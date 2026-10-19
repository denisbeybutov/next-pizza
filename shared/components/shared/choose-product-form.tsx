import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  className,
}) => {
  const textDetails = "30 см, традиционное тесто";
  const totalPrice = 350;

  return (
    <div className={cn("flex w-full min-h-125", className)}>
      {/* Левая часть — картинка */}
      <div className="flex flex-1 items-center justify-center relative w-full ">
        <img src={imageUrl} alt={name} className="relative left-2 transition-all z-10 duration-300 w-87.5 h-87.5" />
      </div>

      {/* Правая часть — информация и кнопка */}
      <div className="flex w-125 shrink-0 flex-col justify-start bg-[#f7f6f5] p-7 rounded-r-xl">
        <div>
          <Title
            text={name}
            size="md"
            className="mb-1 font-extrabold"
          />
          <p className="text-gray-400">{textDetails}</p>
        </div>

        <Button className="h-13.75 w-full rounded-[18px] px-5 text-base mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
