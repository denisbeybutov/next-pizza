
import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = qs.stringify(
    {
      priceFrom: filters.prices.priceFrom,
      priceTo: filters.prices.priceTo,
      pizzaTypes: Array.from(filters.pizzaTypes).sort(),
      sizes: Array.from(filters.sizes).sort(),
      ingredients: Array.from(filters.selectedIngredients).sort(),
    },
    {
      arrayFormat: "comma",
      skipNulls: true,
    }
  );

  React.useEffect(() => {
    const currentQuery = searchParams.toString();

    if (query === currentQuery) return;

    const nextUrl = query ? `${pathname}?${query}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [query, pathname, searchParams, router]);
};
