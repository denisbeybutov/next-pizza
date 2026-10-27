import { Container, Title } from "@/shared/components/shared";
import Link from "next/link";

export default function PaymentPage() {
  return (
    <Container className="mt-10 text-center">
      <Title
        text="Оплата заказа"
        className="mb-6 text-[36px] font-extrabold"
      />

      <p className="mb-4 text-lg">
        Здесь можно оплатить заказ 💳
      </p>

      <p className="mb-8 text-gray-500">
        Страница оплаты находится в разработке.
      </p>

      <Link
        href="/"
        className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
      >
        Вернуться на главную
      </Link>
    </Container>
  );
}