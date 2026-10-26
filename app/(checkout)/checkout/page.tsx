"use client"

import { useForm, SubmitHandler, FormProvider } from "react-hook-form"

import {
  CheckoutSidebar,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared"
import { Input, Textarea } from "@/shared/components/ui"
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

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  })

  const onSubmit = (data : CheckoutFormValues) => {
    console.log(data)
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
              />

              <CheckoutPersonalForm />

              <CheckoutAddressForm />
            </div>

            {/*Правая часть */}
            <div className="w-112.5">
              <CheckoutSidebar totalAmount={totalAmount} />{" "}
            </div>
          </div>
        </form>
        
      </FormProvider>
    </Container>
  )
}
