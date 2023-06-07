import { Product } from '../../api/products/interfaces/product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartProps {
  cartItems: CartItem[];
  onCheckout: () => void;
  isOrderShow: boolean;
  goBack: () => void;
}
