
import { Container, Filters, Title } from "@/shared/components/shared"
import { ProductsGroupList } from "@/shared/components/shared/products-group-list"
import { TopBar } from "@/shared/components/shared/top-bar"
import { Suspense } from "react"
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas"

export default async function Page( {searchParams} : {searchParams: Promise<GetSearchParams>}) {
  const params = await searchParams
  const categories = await findPizzas(params);

  
  return (
    <>
      <Container className="mt-10">
        <Title text='Все пиццы' size='lg' className="font-extrabold"/>        
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

      <Container className="mt-10 pb-14">
        <div className="flex gap-20">
          
          {/* Фильтрация */}
          <div className="w-62.5">
            <Suspense>
              <Filters/>
            </Suspense>
            
            
          </div>          

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                )
              ))}

            </div>

          </div>

        </div>
      </Container>
    </>
  ) 
}
