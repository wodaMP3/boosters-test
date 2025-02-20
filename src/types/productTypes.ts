export interface Product {
    id: string;
    name: string;
    regularity: "month" | "year";
    oldPrice: number; 
    newPrice: number; 
    currency: "USD";
    trial_period: number; // пробный период в днях
    trial_amount: number; // цена пробного периода в центах
    isMostPopular: boolean;
  }
  