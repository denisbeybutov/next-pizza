
"use client"

import { useForm, FormProvider } from "react-hook-form"
import React, { Suspense } from "react"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

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
import { createOreder } from "@/app/actions"
import { Api } from "@/shared/services/api-client"

function CheckoutContent() {
  const [submitting, setSubmitting] = React.useState(false)
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart()
  const { data: session } = useSession()

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

  React.useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await Api.auth.getMe()
        const [firstName, ...lastNameParts] = data.fullName.split(" ")

        form.setValue("firstName", firstName)
        form.setValue("lastName", lastNameParts.join(" "))
        form.setValue("email", data.email)
      } catch (error) {
        console.error("Не удалось загрузить данные пользователя:", error)
      }
    }

    if (session) {
      fetchUserInfo()
    }
  }, [session, form])

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true)

      const url = await createOreder(data)

      toast.success("Заказ успешно оформлен! Переход на оплату...", {
        icon: "✅",
      })

      if (url) {
        window.location.href = url
      } else {
        setSubmitting(false)
      }
    } catch (err) {
      console.error(err)
      setSubmitting(false)

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
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
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

            <div className="w-112.5">
              <CheckoutSidebar
                submitting={submitting}
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <Container className="mt-5">
          <p>Загрузка оформления заказа...</p>
        </Container>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
