import React, { useState } from 'react';
import { CardProps } from './Card.types';
import Button from '../Button/Button';
import './Card.css';

export const Card: React.FC<CardProps> = ({ product, onAdd, onRemove }) => {
  const [count, setCount] = useState(0);

  const onAddProduct = () => {
    setCount((prevState) => prevState + 1);
    onAdd(product);
  };

  const onRemoveProduct = () => {
    setCount((prevState) => (prevState ? prevState - 1 : prevState));
    onRemove(product);
  };

  return (
    <div className="card">
      <span className={`card__badge${count ? '' : '--hidden'}`}>{count}</span>
      <div className="image__container">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <h4 className="card__title">
        {product.name} · <span className="card__price">{product.price} $</span>
      </h4>

      <div className="btn__container">
        <Button title="+" type="add" onClick={onAddProduct} />
        {count ? (
          <Button title="-" type="remove" onClick={onRemoveProduct} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Card;
