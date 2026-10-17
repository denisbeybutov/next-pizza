import { Container, ProductImage, Title } from "@/components/shared"
import { GroupVariants } from "@/components/shared/group-variants"
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
    console.log(product)

  return <Container className="flex flex-col my-10">
    <div className="flex flex-1">
      <ProductImage imageUrl={product.imageUrl} size={40}/>

      <div className="w-122.5 bg-[#f7f6f5] p-7">
        <Title text={product.name} size="md" className="font-extrabold mb-1"></Title>

        <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, quia?</p>

        <GroupVariants
          selectedValue='2'
          items={[
          
          {
            name: 'Маленькая',
            value: '1'
          },
          {
            name: 'Средняя',
            value: '2'
          },
          {
            name: 'Большая',
            value: '3',
            disabled: true
          },
        ]}/>
      </div>
    </div>
  </Container>
}
