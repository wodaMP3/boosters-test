'use client'

import React, { useState } from "react";
import { Product } from "@/types/productTypes";
import ProductCard from "../ProductCard/ProductCard";
import styles from './ProductList.module.css';
import Button from "../Button/Button";
import Header from "../Header/Header";
import Timer from "../Timer/Timer";
import Image from "next/image";
import acute from '@/img/acute.svg'

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
      period: 'Per month',
      isUnique: false,
    },
    {
      id: "2",
      name: "7-day Access",
      regularity: "month",
      oldPrice: 10.00,
      newPrice: 1.00,
      currency: "USD",
      trial_period: 0,
      trial_amount: 100,
      isMostPopular: false,
      period: 'Then 29.99 per month',
      isUnique: true,
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
      period: 'Per month',
      isUnique: false
    },
  ];
  
  

const ProductList: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showTime, setShowTime] = useState<boolean>(true);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleButtonClick = () => {
    const selectedProduct = products.find((p) => p.id === selectedId);
    if (selectedProduct) {
      console.log(`ID: ${selectedProduct.id}, Name: ${selectedProduct.name}`);
    } else {
      console.log('Please, choose the product!');
    }
  }



  return (
    <>
    
    <Header />

    {showTime && (
    <div className={styles.saleBannerMobile}>
        <span className={styles.timerText}>
          <Image src={acute} alt="Timer Icon" className={styles.saleIcon} width={22} height={16} />
          SALE ENDS IN <Timer duration={60} 
          onExpire={() => setShowTime(false) }/>
        </span>
      </div>
    )}

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
    
      <div className={styles.buttonContainer}>
        <Button onClick={handleButtonClick}>Get Started</Button>
      </div>

      <div className={styles.bottomText}>
          <p>Automatic renewal of $29.99 per month.</p>
          <p>You may cancel by support@justdone.ai. Our goal is customer satisfaction</p>
      </div>

    </>
  );
};

export default ProductList;
