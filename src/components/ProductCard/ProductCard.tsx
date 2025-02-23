'use client'

import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { Checkbox } from "@headlessui/react";
import { ProductCardProps } from "./ProductCard.props";
import Timer from "../Timer/Timer";
import Image from "next/image";
import acute from '../../img/acute.png';

const ProductCard: React.FC<ProductCardProps> = ({ product, selected, onSelect }) => {

  const [showTime, setShowTime] = useState<boolean>(true);
  const [isBannerExpired, setIsBannerExpired] = useState<boolean>(false);


  const [variant, setVariant] = useState<"A" | "B" | null>(null);

  useEffect(() => {
    let userVariant = localStorage.getItem("abTestVariant") as "A" | "B" | null;

    if (!userVariant) { // если у юзера перед этим не было варианта, рандомно выбираем
      userVariant = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("abTestVariant", userVariant);
    }

    setVariant(userVariant);
  }, []);


   useEffect(() => {
      // Проверяем, истёк ли таймер при загрузке страницы
      const timerExpired = localStorage.getItem("timerExpired");
      if (timerExpired === "true") {
        setShowTime(false);
        setIsBannerExpired(true);
      }
    }, []);

    const handleTimerExpire = () => {
      setShowTime(false);
      setIsBannerExpired(true);
      localStorage.setItem("timerExpired", "true"); // Фиксируем, что таймер истёк
    };


  return (

    
    <div className={`${styles.productCard} 
      ${selected ? styles.selected : ""} 
      ${isBannerExpired || variant === 'A' ? styles.expiredStyle : "" }`}  // isBannerExpired - для варианта B, проверка varian === a, для варианта а, что бы исчезал баннер сразу
      onClick={() => onSelect(product.id)} // обработка для выбора карточки
      >
        
      {/* "most popular" плашка для первого продукта */}
      {product.isMostPopular && <div className={styles.popularBadge}>Most Popular</div>}

      {/* "Save 90%" плашка для второго продукта */}
      {product.id === "2" && <div className={styles.discount90}>Save 90%</div>}

      {/* "Save 50%" плашка для третьего продукта */}
      {product.id === "3" && <div className={styles.discount50}>Save 50%</div>}

      {/* "Best Value" плашка для третьего продукта */}
      {product.id === "3" && <div className={styles.bestValueBadge}>🚀 Best Value</div>}


       
      {variant === 'B' && showTime && (  // если попался вариант B - отображается счётчик
        <div className={styles.saleBanner}>
        <span className={styles.timerText}><Image src={acute} alt="Timer Icon" className={styles.saleIcon} width={22} height={16}/>
          SALE ENDS IN <Timer duration={60} 
            onExpire={handleTimerExpire}/></span>
        <div className={styles.bannerArrow}></div> 
      </div>
       )} 
        
        <div className={styles.cardContent}>
      <div className={styles.checkboxContainer}>
        <Checkbox
          checked={selected}
          onChange={() => onSelect(product.id)}
          className={`${styles.checkbox} ${selected ? styles.checked : ""}`} // обработка выбора карточки
          >
        
          <svg className="stroke-white opacity-1 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          </Checkbox>
      </div>
      <h3 className={styles.period}>{product.name}</h3>
      <p className={styles.price}>
        <span className={styles.oldPrice}>${product.oldPrice.toFixed(2)}</span> 
        <span className={styles.newPrice}>${product.newPrice.toFixed(2)}</span> 
        <span className={styles.monthly}>{product.period}</span>
      </p>
      </div>
    </div>
  );
};

export default ProductCard;
