// @flow
import React from 'react';

type Props = {
  count: number,
};

const CartIcon: (Props) => React$Node = ({ count }) => (
  <div className="cart-icon">
    <img src="/icons/cart.png" alt="Cart" />
    <span className="badge">{count}</span>
  </div>
);

export default CartIcon;
