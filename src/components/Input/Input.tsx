import React, { useState } from 'react';
import { InputProps } from './Input.types';
import './Input.css';

export const Input: React.FC<InputProps> = ({
  value,
  onTextChange,
  placeholder,
  validCheck,
  errorMessage,
}) => {
  const [error, setError] = useState(false);

  const onChange = (text: string) => {
    const isTextValid = validCheck(text);
    if (!isTextValid) {
      setError(true);
    } else {
      setError(false);
    }
    onTextChange(text);
  };

  return (
    <div>
      <input
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? <p className="input__error">{errorMessage}</p> : <></>}
    </div>
  );
};

export default Input;
