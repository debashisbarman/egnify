// @flow
import React, { useEffect } from 'react';
import type { Product, Products } from '../types';
import CartIcon from './CartIcon';
import { formatPrice } from '../utils';

type Props = {
  open: boolean,
  onClose: () => void,
  cart: Products,
  toggleItemOnCart: (Product) => void,
};

declare var document: Object;

const Modal: (Props) => React$Node = ({
  open,
  onClose,
  cart,
  toggleItemOnCart,
}) => {
  useEffect(() => {
    document.body.style.overflowY = open ? 'hidden' : 'auto';
  }, [open]);

  const getSubtotal = (): number => cart.reduce((a, { price }) => a + price, 0);

  const formatPriceWithCurrency = (currency: string, price: string): string => {
    const [whole, decimal] = formatPrice(price);

    return `${currency} ${whole}.${decimal}`;
  };

  const renderCartItem = (p): React$Node => (
    <div key={p.id} className="cart-item">
      <img src={p.src_2} alt={p.title} />
      <div className="cart-item-details">
        <p className="cart-item-title">{p.title}</p>
        <p>Size: {p.availableSizes.join(' / ')}</p>
        <p>Quantity: 1</p>
      </div>
      <div className="cart-item-actions">
        <button
          className="cart-item-remove-button"
          onClick={() => toggleItemOnCart(p)}>
          &times;
        </button>
        <p className="price">
          {formatPriceWithCurrency(p.currencyFormat, `${p.price}`)}
        </p>
        <ul className="increment-button">
          <li>&minus;</li>
          <li>&#x2b;</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className={`modal-container${open ? ' open' : ''}`}>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <div className="modal-content">
        <div className="modal-body">
          <div className="modal-header">
            <CartIcon count={cart.length} />
            &nbsp;
            <p>Cart</p>
          </div>
          {cart.map(renderCartItem)}
        </div>
        <div className="modal-footer">
          <div className="subtotal-container">
            <p>SUBTOTAL</p>
            <p className="subtotal">
              {formatPriceWithCurrency('$', `${getSubtotal()}`)}
            </p>
          </div>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
