import React, { useState } from "react";
import { Product } from "@/types/productTypes";
import ProductCard from "../ProductCard/ProductCard";
import styles from './ProductList.module.css';

const products: Product[] = [
    {
      id: "1",
      name: "Unlimited 1-month Plan",
      regularity: "month",
      oldPrice: 69.99,
      newPrice: 39.99,
      currency: "USD",
      trial_period: 7,
      trial_amount: 100,
      isMostPopular: true,
    },
    {
      id: "2",
      name: "7-day Access",
      regularity: "month",
      oldPrice: 1,
      newPrice: 1,
      currency: "USD",
      trial_period: 0,
      trial_amount: 100,
      isMostPopular: false,
    },
    {
      id: "3",
      name: "Unlimited Annual Plan",
      regularity: "year",
      newPrice: 24.99,
      oldPrice: 49.00,
      currency: "USD",
      trial_period: 14,
      trial_amount: 100,
      isMostPopular: false,
    },
  ];
  

const ProductList: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          selected={selectedId === product.id}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default ProductList;
