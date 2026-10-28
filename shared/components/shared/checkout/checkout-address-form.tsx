'use client'

import React from "react"
import { WhiteBlock } from "../white-block"
import { Input, Textarea } from "../../ui"
import { FormTextarea } from "../form-components"

import dynamic from "next/dynamic"
import { Controller, useFormContext } from "react-hook-form"
import { ErrorText } from "../error-text"

const AddressInput = dynamic(
  () => import("../address-input").then((mod) => mod.AddressInput),
  { ssr: false }
)

interface Props {
  className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext()
  return (
    <WhiteBlock className={className} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => <>
            <AddressInput onChange={field.onChange} />
            {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}
          </>}
        />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  )
}
