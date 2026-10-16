"use client"

import React from "react"
import { Title } from "./title"
import { FilterCheckbox } from "./filter-checkbox"
import { Button, Input } from "../ui"
import { RangeSlider } from "./range-slider"
import { CheckboxFiltersGroup } from "./checkbox-filters-group"
import { RadioGroup, RadioGroupItem } from "../ui"
import { Label } from "../ui"
import { useFilterIngredients } from "@/hooks/useFilterIngredients"

interface Props {
  className?: string
}

interface PriceProps {
  priceFrom: number
  priceTo: number
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients()
  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  })

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }))

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    })
  }

  return (
    <div className={className}>
      <Title text="Фильтрация" className="font-bold" />

      {/* Верхние чекбоксы */}
      <div className="mt-5 flex flex-col gap-4">
        <FilterCheckbox name="aaa" text="Можно собирать" value="1" />
        <FilterCheckbox name="bbb" text="Новинки" value="2" />
      </div>

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Цена от и до</p>
        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[
          prices.priceFrom,
          prices.priceTo
        ]} onValueChange={([priceFrom, priceTo])=> setPrice({priceFrom,priceTo})}/>
      </div>

      {/* Ингридиенты */}
      <CheckboxFiltersGroup
        title="Ингридиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selectedIds={selectedIds}
      />

      {/* Толщина теста */}
      <div className="mt-8 flex flex-col gap-2">
        <p className="mb-3 font-bold">Тип теста</p>
        <RadioGroup defaultValue="1" className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="1" id="test-1" />
            <Label htmlFor="test-1" className="cursor-pointer text-base">
              Традиционое
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="2" id="test-2" />
            <Label htmlFor="test-2" className="cursor-pointer text-base">
              Тонкое
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button className="mt-5 w-full">Применить</Button>
    </div>
  )
}
