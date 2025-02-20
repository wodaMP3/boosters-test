import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { Checkbox } from "@headlessui/react";
import { ProductCardProps } from "./ProductCard.props";
import Timer from "../Timer/Timer";
import Image from "next/image";
import acute from '../../img/acute.png';

const ProductCard: React.FC<ProductCardProps> = ({ product, selected, onSelect }) => {

  const [showTime, setShowTime] = useState<boolean>(true);

  return (
    <div className={`${styles["product-card"]} 
      ${selected ? styles.selected : ""}`} 
      onClick={() => onSelect(product.id)}
      >
        {product.isMostPopular && <div className={styles.popularBadge}>Most Popular</div>}
        <div className={styles.saleBanner}>
          <span className={styles.timerText}><Image src={acute} alt="Timer Icon" className={styles.saleIcon} width={22} height={16}/>
            SALE ENDS IN <Timer duration={1} 
              onExpire={() => setShowTime(false) }/></span>
          <div className={styles.bannerArrow}></div> 
        </div>
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
        <span className={styles.oldPrice}>$49.99</span> 
        <span className={styles.newPrice}>$29.99</span> 
        <span className={styles.monthly}>Per month</span>
      </p>
      </div>
    </div>
  );
};

export default ProductCard;
