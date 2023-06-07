import React, { useState, useEffect, useCallback } from 'react';
import { Product } from './api/products/interfaces/product';
import { getProducts } from './api/products/get-products.api';
import Card from './components/Card/Card';
import './App.css';
import { CartItem } from './components/Cart/Cart.types';
import Cart from './components/Cart/Cart';
import { OrderPage } from './components/OrderPage/OrderPage';

//@ts-ignore
const tele = window.Telegram.WebApp;

export const App = () => {
  const [data, setData] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showOrder, setShowOrder] = useState(false);

  const loadData = useCallback(async () => {
    const products = await getProducts();
    setData(products);
  }, []);

  useEffect(() => {
    tele.ready();
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onAddItem = (product: Product) => {
    const exist = cartItems.find((item) => item._id === product._id);
    if (exist) {
      setCartItems((prevState) =>
        prevState.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevState) => [...prevState, { ...product, quantity: 1 }]);
    }
  };

  const onRemoveItem = (product: Product) => {
    const exist = cartItems.find((item) => item._id === product._id);
    if (exist?.quantity === 1) {
      setCartItems((prevState) =>
        prevState.filter((item) => item._id !== exist?._id)
      );
    } else {
      setCartItems((prevState) =>
        prevState.map((item) =>
          item._id === exist?._id
            ? { ...exist, quantity: exist?.quantity - 1 }
            : item
        )
      );
    }
  };

  const goBack = () => {
    setShowOrder(false);
  };

  const onCheckout = () => {
    setShowOrder(true);
    tele.MainButton.text = 'Pay';
    tele.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">{showOrder ? 'Your Order' : 'Order Food'}</h1>
      <Cart
        cartItems={cartItems}
        onCheckout={onCheckout}
        isOrderShow={showOrder}
        goBack={goBack}
      />
      <div className={showOrder ? '' : 'hidden'}>
        <OrderPage tele={tele} cartItems={cartItems} />
      </div>
      <div className={`cards__container ${showOrder ? 'hidden' : ''}`}>
        {data.map((item, index) => (
          <Card
            product={item}
            key={index}
            onAdd={onAddItem}
            onRemove={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
};

export default App;
