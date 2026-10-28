
"use client";

import React from "react";
import { Title } from "./title";
import { Button, Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients, useFilters, useQueryFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" className="font-bold" />

      {/* Тип теста */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mt-5 mb-5"
        title="Тип теста"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      {/* Размер пиццы */}
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Цена от и до</p>

        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={filters.prices.priceFrom ?? ""}
            onChange={(e) =>
              filters.setPrices(
                "priceFrom",
                e.target.value === ""
                  ? undefined
                  : Number(e.target.value)
              )
            }
          />

          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={filters.prices.priceTo ?? ""}
            onChange={(e) =>
              filters.setPrices(
                "priceTo",
                e.target.value === ""
                  ? undefined
                  : Number(e.target.value)
              )
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom ?? 0,
            filters.prices.priceTo ?? 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>

      {/* Ингредиенты */}
      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />

      {/* <Button className="mt-5 w-full">Применить</Button> */}
    </div>
  );
};
