'use client'

import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from './ProductList.module.css';
import Button from "../Button/Button";
import Header from "../Header/Header";
import Timer from "../Timer/Timer";
import Image from "next/image";
import acute from '@/img/acute.svg';
import products from "@/app/data/products/products";

/**
 * Компонент ProductList отображает список продуктов и обрабатывает выбор одного из них.
 * Также реализует A/B-тестирование: 50% пользователей видят таймер со скидкой.
 */
const ProductList: React.FC = () => {
  /** ID выбранного продукта */
  const [selectedId, setSelectedId] = useState<string | null>(null);
  /** Флаг отображения таймера */
  const [showTime, setShowTime] = useState<boolean>(true);
  /** Вариант A/B-теста */
  const [variant, setVariant] = useState<"A" | "B" | null>(null);

  /**
   * Определяет A/B-вариант пользователя и сохраняет его в localStorage.
   */
  useEffect(() => {
    let userVariant = localStorage.getItem("abTestVariant") as "A" | "B" | null;

    if (!userVariant) {
      userVariant = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("abTestVariant", userVariant);
    }

    setVariant(userVariant);
  }, []);

  /**
   * Обрабатывает выбор продукта.
   * @param {string} id - ID выбранного продукта.
   */
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  /**
   * Обрабатывает клик по кнопке "Get Started".
   * Если продукт выбран, выводит его ID и имя в консоль.
   */
  const handleButtonClick = () => {
    const selectedProduct = products.find((p) => p.id === selectedId);
    if (selectedProduct) {
      console.log(`ID: ${selectedProduct.id}, Name: ${selectedProduct.name}`);
    } else {
      console.log("Please, choose the product!");
    }
  };

  return (
    <>
      <Header />

      {/* A/B тест: таймер отображается только в варианте "B" */}
      {variant === "B" && showTime && (
        <div className={styles.saleBannerMobile}>
          <span className={styles.timerText}>
            <Image
              src={acute}
              alt="Timer Icon"
              className={styles.saleIcon}
              width={22}
              height={16}
            />
            SALE ENDS IN{" "}
            <Timer duration={60} onExpire={() => setShowTime(false)} />
          </span>
        </div>
      )}

      {/* Список продуктов */}
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

      {/* Кнопка "Get Started" */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleButtonClick}>Get Started</Button>
      </div>

      {/* Дополнительный текст о подписке */}
      <div className={styles.bottomText}>
        <p>Automatic renewal of $29.99 per month.</p>
        <p>
          You may cancel by support@justdone.ai. Our goal is customer
          satisfaction.
        </p>
      </div>
    </>
  );
};

export default ProductList;
