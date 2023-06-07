import { Product } from '../../api/products/interfaces/product';

export interface CardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
}
