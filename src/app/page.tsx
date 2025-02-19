'use client'

import ProductCard from "@/components/ProductCard/ProductCard";
import { useState } from "react";
import { Product } from "@/types/productTypes";
import ProductList from "@/components/ProductList/ProductList";



export default function Home() {

  return (
    <main>
      <ProductList />
    </main>
  );
}
