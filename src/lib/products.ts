import { Product } from '../types/productTypes';

export const products: Product[] = [
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
    period: 'Per month'
  },
];
