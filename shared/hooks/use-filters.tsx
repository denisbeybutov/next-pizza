
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (
    name: keyof PriceProps,
    value: number | undefined
  ) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();

  // Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") ?? [])
  );

  // Фильтр размеров
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") ?? [])
  );

  // Фильтр типов пиццы
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") ?? [])
  );

  // Фильтр цены
  const [prices, setPrices] = React.useState<PriceProps>(() => {
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");

    return {
      priceFrom: priceFrom ? Number(priceFrom) : undefined,
      priceTo: priceTo ? Number(priceTo) : undefined,
    };
  });

  const updatePrice = (
    name: keyof PriceProps,
    value: number | undefined
  ) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients,
  };
};
