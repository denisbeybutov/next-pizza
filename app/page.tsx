
import { Categories, Container, Title } from "@/components/shared"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <>
      <Container className="mt-10">
        <Title text='Все пиццы' size='lg' className="font-extrabold"/>

        <Categories/>
      </Container>
    </>
  ) 
}
