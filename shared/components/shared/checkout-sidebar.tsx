import React from "react"
import { WhiteBlock } from "./white-block"
import { CheckoutItemDetails } from "./checkout-item-details"
import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import { Button, Skeleton } from "../ui"

const VAT = 15
const DELIVER_PRICE = 250

interface Props {
  totalAmount: number
  loading?: boolean
  className?: string
  submitting?: boolean
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
  submitting,
}) => {
  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + DELIVER_PRICE + vatPrice

  return (
    <WhiteBlock className="sticky top-4 p-6">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalPrice} Р</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины
          </div>
        }
        value={loading ? <Skeleton className="h-7 w-16 roynded-sm" /> : `${totalAmount} Р`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги
          </div>
        }
        value={loading ? <Skeleton className="h-7 w-16 roynded-sm" /> : `${vatPrice} Р`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка
          </div>
        }
        value={loading ? <Skeleton className="h-7 w-16 roynded-sm" /> : `${DELIVER_PRICE} Р`}
      />

      <Button
        loading={loading}
        type="submit"
        className="mt-6 h-14 w-full rounded-2xl text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="ml-2 w-5" />
      </Button>
    </WhiteBlock>
  )
}
