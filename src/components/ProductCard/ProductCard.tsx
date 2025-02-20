import React from "react";
import styles from "./ProductCard.module.css";
import { Checkbox } from "@headlessui/react";
import { ProductCardProps } from "./ProductCard.props";

const ProductCard: React.FC<ProductCardProps> = ({ product, selected, onSelect }) => {
  return (
    <div className={`${styles["product-card"]} 
      ${selected ? styles.selected : ""}`} 
      onClick={() => onSelect(product.id)}
      >
        {product.isMostPopular && <div className={styles.popularBadge}>Most Popular</div>}

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
  );
};

export default ProductCard;
