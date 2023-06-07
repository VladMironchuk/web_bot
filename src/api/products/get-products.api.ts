import { Product } from './interfaces/product';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('http://localhost:3000/api/products');
  const data = await res.json();
  return data;
};
