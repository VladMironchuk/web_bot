import React, { useState, useCallback, useEffect } from 'react';
import { OrderPageProps } from './OrderPage.types';
import Input from '../Input/Input';

import './OrderPage.css';

export const OrderPage: React.FC<OrderPageProps> = ({ tele, cartItems }) => {
  const [phone, setPhone] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [address, setAddress] = useState('');

  const addressCheck = (text: string) => text !== '';

  const phoneCheck = (text: string) => {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      text
    );
  };

  const creditCardCheck = (text: string) => {
    const visaCheck = /^4[0-9]{12}(?:[0-9]{3})?$/.test(text);
    const masterCardCheck =
      /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(
        text
      );

    return visaCheck || masterCardCheck;
  };

  const onChangeValue = (type: 'phone' | 'creditCard' | 'address') => {
    switch (type) {
      case 'address':
        return (text: string) => setAddress(text);
      case 'creditCard':
        return (text: string) => setCreditCard(text);
      case 'phone':
        return (text: string) => setPhone(text);
    }
  };

  const onSendData = useCallback(() => {
    if (
      !addressCheck(address) ||
      !phoneCheck(phone) ||
      !creditCardCheck(creditCard)
    ) {
      return;
    }
    const data = {
      address,
      creditCard,
      phone,
      order: cartItems
        .map((item) => `${item.name}: ${item.quantity}`)
        .join(', '),
      price: cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
    };
    tele.sendData(JSON.stringify(data));
  }, [tele, address, creditCard, phone, cartItems]);

  useEffect(() => {
    tele.onEvent('mainButtonClicked', onSendData);

    return () => {
      tele.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tele]);

  return (
    <div className="orderPage__container">
      <Input
        value={phone}
        onTextChange={onChangeValue('phone')}
        placeholder="Phone"
        validCheck={phoneCheck}
        errorMessage="Enter a phone."
      />
      <Input
        value={creditCard}
        onTextChange={onChangeValue('creditCard')}
        placeholder="Credit Card"
        validCheck={creditCardCheck}
        errorMessage="Enter valid Visa or MasterCard number"
      />
      <Input
        value={address}
        onTextChange={onChangeValue('address')}
        placeholder="Address"
        validCheck={addressCheck}
        errorMessage="Enter the address."
      />
    </div>
  );
};
