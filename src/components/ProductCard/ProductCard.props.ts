import { Product } from "@/types/productTypes";

export interface ProductCardProps {
  product: Product;
  selected: boolean;
  onSelect: (id: string) => void;
  isMostPopular?: boolean; // if u need to change the popular one 
  isUnique?: boolean;
}