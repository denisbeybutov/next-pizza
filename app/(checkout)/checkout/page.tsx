"use client"

import { useForm, FormProvider } from "react-hook-form"

import { CheckoutSidebar, Container, Title } from "@/shared/components/shared"
import { useCart } from "@/shared/hooks"
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from "@/shared/components/shared/checkout"
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/components/shared/checkout/checkout-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createOreder } from "@/app/actions"
import toast from "react-hot-toast"
import React from "react"

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false)
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  })

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true)
      const url = await createOreder(data)

      toast.error("Заказ успешно оформлен! переход на оплату...", {
        icon: "✅",
      })

      if (url) {
        location.href = url
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      })
    } 
  }

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <Container className="mt-5">
      <Title
        text="Оформление заказа"
        className="mb-8 text-[36px] font-extrabold"
      ></Title>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/*Левая часть */}
            <div className="mb-20 flex flex-1 flex-col gap-10">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? "pointer-events-none opacity-40" : ""}
              />

              <CheckoutAddressForm
                className={loading ? "pointer-events-none opacity-40" : ""}
              />
            </div>

            {/*Правая часть */}
            <div className="w-112.5">
              <CheckoutSidebar
                submitting={submitting}
                totalAmount={totalAmount}
                loading={loading || submitting}
              />{" "}
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
