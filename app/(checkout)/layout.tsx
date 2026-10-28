// import { Container, Header } from "@/shared/components/shared";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Next Pizza | Корзина",
//   description: "Оформление заказа",
// };

// export default function CheckoutLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="min-h-screen bg-[#F4F1EE]">
//       <Container>
//         <Header hasSearch={false} hasCart={false} className="border-gray-200"/>
//       {children}
//       </Container>
//     </main>
//   );
// }


import { Container, Header } from "@/shared/components/shared";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Корзина",
  description: "Оформление заказа",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Suspense fallback={<div className="h-20" />}>
          <Header
            hasSearch={false}
            hasCart={false}
            className="border-gray-200"
          />
        </Suspense>

        {children}
      </Container>
    </main>
  );
}
