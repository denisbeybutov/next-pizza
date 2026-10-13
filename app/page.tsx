
import { Container, Filters, Title } from "@/components/shared"
import { ProductCard } from "@/components/shared/product-card"
import { ProductsGroupList } from "@/components/shared/products-group-list"
import { TopBar } from "@/components/shared/top-bar"

export default function Page() {
  return (
    <>
      <Container className="mt-10">
        <Title text='Все пиццы' size='lg' className="font-extrabold"/>        
      </Container>

      <TopBar/>

      <Container className="mt-10 pb-14">
        <div className="flex gap-20">
          
          {/* Фильтрация */}
          <div className="w-62.5">
            <Filters/>
            
          </div>          

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title='Пиццы' items={[
                {
                  id: 1,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 2,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 3,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 4,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 5,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 6,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                
              ]} categoryId={1}/>

              <ProductsGroupList title='Закуски' items={[
                {
                  id: 1,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 2,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 3,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 4,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 5,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 6,
                  name: 'Чизбургер пицца',
                  imageUrl: './image2.png',
                  price: 550,
                  items: [{price: 550}],
                },
                
              ]} categoryId={2}/>

            </div>

          </div>

        </div>
      </Container>
    </>
  ) 
}
