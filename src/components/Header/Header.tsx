import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import features from "@/app/data/featuresIcons/features";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Choose Your Plan:</h2>
      
      {/* Контейнер для иконок */}
      <div className={styles.featuresContainer}>
        <div className={styles.scroller}>
          <div className={styles.scrollContent}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <Image src={feature.src} alt={feature.text} width={40} height={40} className={styles.icon} />
                <span className={styles.text}>{feature.text}</span>
              </div>
            ))}
            
            {/* Дублирование списка ТОЛЬКО на мобильных */}
            <div className={styles.duplicate}>
              {features.map((feature, index) => (
                <div key={index + features.length} className={styles.featureItem} aria-hidden="true">
                  <Image src={feature.src} alt={feature.text} width={40} height={40} className={styles.icon} />
                  <span className={styles.text}>{feature.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
