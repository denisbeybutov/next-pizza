import { Container } from "@/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findFirst(
    { 
      where: {
       id: Number(id) 
      } 
    })

    if(!product) {
      return notFound();
    }
    // console.log(product)

  return <Container className="flex flex-col my-10">
    <ProductImage src={product.imageUrl}/>
  </Container>
}
