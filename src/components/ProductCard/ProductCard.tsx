'use client'

import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { Checkbox } from "@headlessui/react";
import { ProductCardProps } from "./ProductCard.props";
import Timer from "../Timer/Timer";
import Image from "next/image";
import acute from '../../img/acute.png';

const ProductCard: React.FC<ProductCardProps> = ({ product, selected, onSelect, isUnique, isTimerExpired }) => {

  const [showTime, setShowTime] = useState<boolean>(true);


   useEffect(() => {
      // Проверяем, истёк ли таймер при загрузке страницы
      const timerExpired = localStorage.getItem("timerExpired");
      if (timerExpired === "true") {
        setShowTime(false);
      }
    }, []);

    const handleTimerExpire = () => {
      setShowTime(false);
      localStorage.setItem("timerExpired", "true"); // Фиксируем, что таймер истёк
    };

  return (

    
    <div className={`${styles.productCard} ${isUnique ? styles.customPosition : ""} 
      ${selected ? styles.selected : ""} ${isTimerExpired ? styles.expiredStyle : "" }`} 
      onClick={() => onSelect(product.id)}
      >
        

        {product.isMostPopular && <div className={styles.popularBadge}>Most Popular</div>}


      {/* "Save 90%" плашка для второго продукта */}
      {product.id === "2" && <div className={styles.discount90}>Save 90%</div>}

      {/* "Save 50%" плашка для третьего продукта */}
      {product.id === "3" && <div className={styles.discount50}>Save 50%</div>}

      {/* "Best Value" плашка для третьего продукта */}
      {product.id === "3" && <div className={styles.bestValueBadge}>🚀 Best Value</div>}


       
       {showTime && (
        <div className={styles.saleBanner}>
        <span className={styles.timerText}><Image src={acute} alt="Timer Icon" className={styles.saleIcon} width={22} height={16}/>
          SALE ENDS IN <Timer duration={30} 
            onExpire={handleTimerExpire}/></span>
        <div className={styles.bannerArrow}></div> 
      </div>
       )} 
        
        <div className={styles.cardContent}>
      <div className={styles.checkboxContainer}>
        <Checkbox
          checked={selected}
          onChange={() => onSelect(product.id)}
          className={`${styles.checkbox} ${selected ? styles.checked : ""}`}
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
