import React from 'react';
import './Button.css';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  type,
  title,
  disabled = false,
  onClick,
}) => {
  return (
    <button className={`btn ${type}`} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
