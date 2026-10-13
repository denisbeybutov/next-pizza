

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Button, Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import {RadioGroup, RadioGroupItem} from '../ui'
import {Label} from '../ui'

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Title text='Фильтрация' className='font-bold'/>

            {/* Верхние чекбоксы */}
            <div className='flex flex-col gap-4 mt-5'>
              <FilterCheckbox text='Можно собирать' value='1'/>
              <FilterCheckbox text='Новинки' value='2'/>
            </div>

            {/* Цена от и до */}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
              <p className='font-bold mb-3'>Цена от и до</p>
              <div className='flex gap-3 mb-5'>
                <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0}/>
                <Input type='number' placeholder='1000' min={100} max={1000} />
              </div>

              <RangeSlider min={0} max={1000} step={10} value={[0,1000]}/>
            </div>

            {/* Ингридиенты */}
            <CheckboxFiltersGroup
              title='Ингридиенты'
              className='mt-5'
              limit={6}
              defaultItems={[
                {
                  text: "Сырный соус",
                  value: '1'
                },
                {
                  text: "Моцарелла",
                  value: '2'
                },
                {
                  text: "Чеснок",
                  value: '3'
                },
                {
                  text: "Соленые огурчики",
                  value: '4'
                },
                {
                  text: "Красный лук",
                  value: '5'
                },
                {
                  text: "Томаты",
                  value: '6'
                },
              ]}
              items={[
                {
                  text: "Сырный соус",
                  value: '1'
                },
                {
                  text: "Моцарелла",
                  value: '2'
                },
                {
                  text: "Чеснок",
                  value: '3'
                },
                {
                  text: "Соленые огурчики",
                  value: '4'
                },
                {
                  text: "Красный лук",
                  value: '5'
                },
                {
                  text: "Томаты",
                  value: '6'
                },
                {
                  text: "Сырный соус",
                  value: '1'
                },
                {
                  text: "Моцарелла",
                  value: '2'
                },
                {
                  text: "Чеснок",
                  value: '3'
                },
                {
                  text: "Соленые огурчики",
                  value: '4'
                },
                {
                  text: "Красный лук",
                  value: '5'
                },
                {
                  text: "Томаты",
                  value: '6'
                },
              ]}
            />

            <div className='mt-8 flex flex-col gap-2'>
                <p className='font-bold mb-3'>Тип теста</p>
                <RadioGroup
                  defaultValue='1'
                  className='flex flex-col gap-4'
                  
                >
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value='1' id='test-1'/>
                    <Label htmlFor='test-1' className='cursor-pointer text-base'>
                      Традиционое
                    </Label>
                  </div>
                  
                  <div className='flex items-center gap-2'>
                    <RadioGroupItem value='2' id='test-2'/>
                    <Label htmlFor='test-2' className='cursor-pointer text-base'>
                      Тонкое
                    </Label>
                  </div>
                </RadioGroup>
            </div>

            <Button className='mt-5 w-full'>Применить</Button>
        </div>
    );
};