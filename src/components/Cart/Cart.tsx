import React, { useMemo } from 'react';
import { CartProps } from './Cart.types';
import Button from '../Button/Button';
import './Cart.css';

export const Cart: React.FC<CartProps> = ({
  cartItems,
  onCheckout,
  isOrderShow,
  goBack,
}) => {
  const totalPrice = useMemo(
    () => cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
    [cartItems]
  );
  return (
    <div className="cart__container">
      {cartItems.length === 0 ? 'No items in cart' : ''}
      <br />
      {cartItems.length !== 0 && (
        <span>Total price: ${totalPrice.toFixed(2)}</span>
      )}
      <Button
        title={
          cartItems.length === 0
            ? 'Order !'
            : isOrderShow
            ? 'Go back'
            : 'Checkout'
        }
        type="checkout"
        disabled={cartItems.length === 0}
        onClick={isOrderShow ? goBack : onCheckout}
      />
    </div>
  );
};

export default Cart;
