import { createContext, use, useState, type PropsWithChildren } from "react";
import {
  AddedCartItems,
  Category,
  OrderStuff,
  Product,
  Subcategory,
} from "./type";

export interface SelectedCategory {
  category: string;
  id: number;
}

export interface FinalCartData {
  finalCartData: AddedCartItems[];
  orderData: OrderStuff;
}

export const ProductContext = createContext<
  | {
      selectCategory: Category | null;
      setSelectCategory: (category: Category) => void;
      currentPage: number;
      setCurrentPage: (page: number) => void;
      hasMore: boolean;
      setHasMore: (hasMore: boolean) => void;
      product: Product | null;
      setProduct: (product: Product) => void;
      //   for category screen
      setSelectCategoryFilter: (category: Category) => void;
      selectCategoryFilter: Category | null;
      setSelectProductCategory: (category: Category) => void;
      selectProductCategory: Category | null;
      setSubCategory: (subcategory: Subcategory) => void;
      cartState: FinalCartData | null;
      setCartState: (finalCartData: FinalCartData) => void;
    }
  | undefined
>(undefined);

// This hook can be used to access the user info.
export function useProductCtx() {
  const value = use(ProductContext);
  if (!value) {
    throw new Error("useProductCtx must be wrapped in a <ProductProvider />");
  }

  return value;
}

export function ProductProvider({ children }: PropsWithChildren) {
  const [selectCategory, setSelectCategory] = useState<Category | null>({
    id: 0,
    name: "All",
    slug: "",
    image_url: "",
    product_count: 0,
    subcategories: [],
  });
  const [selectCategoryFilter, setSelectCategoryFilter] = useState<Category | null>({
    id: 0,
    name: "All",
    slug: "",
    image_url: "",
    product_count: 0,
    subcategories: [],
  });
  const [selectProductCategory, setSelectProductCategory] =
    useState<Category | null>({
      id: 18,
      name: "All",
      slug: "grillz",
      image_url: "",
      product_count: 0,
      subcategories: [],
    });
  const [subCategory, setSubCategory] = useState<Subcategory | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cartState, setCartState] = useState<FinalCartData | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const handleCategoryChange = (category: Category) => {
    setSelectCategory(category);
    setCurrentPage(1); // Reset page when category changes
    setHasMore(true); // Reset hasMore when category changes
  };

  return (
    <ProductContext
      value={{
        selectCategory,
        setSelectCategory: handleCategoryChange,
        currentPage,
        setCurrentPage,
        hasMore,
        setHasMore,
        product,
        setProduct,
        setSelectCategoryFilter,
        selectCategoryFilter,
        setSubCategory,
        cartState,
        setCartState,
        selectProductCategory,
        setSelectProductCategory
      }}
    >
      {children}
    </ProductContext>
  );
}
