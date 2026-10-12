
import { Container, Filters, Title } from "@/components/shared"
import { TopBar } from "@/components/shared/top-bar"

export default function Page() {
  return (
    <>
      <Container className="mt-10">
        <Title text='Все пиццы' size='lg' className="font-extrabold"/>        
      </Container>

      <TopBar/>

      <Container className="mt-10 pb-14">
        <div className="flex gap-15">
          
          {/* Фильтрация */}
          <div className="w-62.5">
            <Filters/>
            
          </div>          

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              Список товаров

            </div>

          </div>

        </div>
      </Container>
    </>
  ) 
}
