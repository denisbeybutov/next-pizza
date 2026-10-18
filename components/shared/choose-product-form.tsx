
// import { cn } from "@/lib/utils";
// import React from "react"
// import { ProductImage } from "./product-image";
// import { Title } from "./title";
// import { Button } from "../ui";

// interface Props {
//   imageUrl: string;
//   name: string;
//     className?: string;
//     ingredients: any[];
//     items?: any[];
//     onClickAdd?: VoidFunction;
// }

// export const ChoosePizzaForm: React.FC<Props> = ({ 
//   name,
//   items,
//   imageUrl,
//   ingredients,
//   onClickAdd,
//   className }) => {
//     const textDetails = '30 см, традиционное тесто 30'
//     const totalPrice = 350;
//     return (
//       <div className={cn(className, 'flex flex-1 ')}>
        
//         <div className="w-122.5 bg-[#f7f6f5] p-7">
//         <ProductImage imageUrl={imageUrl} size={30}/>
        

//           <Title text={name} size="md" className="font-extrabold mb-1"></Title>
//           <p className="text-gray-400">{textDetails}</p>        

//           <Button
            
//             className="h-[55px] px-10 text-base rounded-[18px] w-full"
//           >
//             Добавить в корзину за {totalPrice} Р
//           </Button>
//         </div>
//       </div>
//     )
// };


import { cn } from "@/lib/utils";
import React from "react";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  className,
}) => {
  const textDetails = "30 см, традиционное тесто";
  const totalPrice = 350;

  return (
    <div className={cn("flex w-full min-h-[500px]", className)}>
      {/* Левая часть — картинка */}
      <div className="flex flex-1 items-center justify-center relative w-full ">
        <img src={imageUrl} alt={name} className="relative left-2 transition-all z-10 duration-300 w-[350px] h-[350px]" />
      </div>

      {/* Правая часть — информация и кнопка */}
      <div className="flex w-[500px] shrink-0 flex-col justify-start bg-[#f7f6f5] p-7 rounded-r-xl">
        <div>
          <Title
            text={name}
            size="md"
            className="mb-1 font-extrabold"
          />
          <p className="text-gray-400">{textDetails}</p>
        </div>

        <Button className="h-[55px] w-full rounded-[18px] px-5 text-base mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
