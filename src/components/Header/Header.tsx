import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import features from "@/app/data/featuresIcons/features";

/**
 * Компонент Header отображает заголовок страницы и список преимуществ (features).
 * Использует анимацию горизонтального скролла для иконок.
 */
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Заголовок блока */}
      <h2 className={styles.title}>Choose Your Plan:</h2>

      {/* Контейнер для иконок с преимуществами */}
      <div className={styles.featuresContainer}>
        <div className={styles.scroller}>
          <div className={styles.scrollContent}>
            {/* Основной список иконок */}
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <Image 
                  src={feature.src} 
                  alt={feature.text} 
                  width={40} 
                  height={40} 
                  className={styles.icon} 
                />
                <span className={styles.text}>{feature.text}</span>
              </div>
            ))}

            {/* Дублированный список для плавного зацикленного скролла (на мобильных) */}
            <div className={styles.duplicate}>
              {features.map((feature, index) => (
                <div 
                  key={index + features.length} 
                  className={styles.featureItem} 
                  aria-hidden="true"
                >
                  <Image 
                    src={feature.src} 
                    alt={feature.text} 
                    width={40} 
                    height={40} 
                    className={styles.icon} 
                  />
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
