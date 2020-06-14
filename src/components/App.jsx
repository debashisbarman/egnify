// @flow
import React, { useEffect, useState } from 'react';
import type { AvailableSizes, Product, Products, Size } from '../types';
import '../styles/master.scss';
import Modal from './Modal';
import CartIcon from './CartIcon';
import { formatPrice } from '../utils';

type Props = {
  availableSizes: AvailableSizes,
  products: Products,
  selectedSizes: AvailableSizes,
  sortBy: string,
  cart: Products,
  onSelectSize: (Size) => void,
  onSort: (string) => void,
  toggleItemOnCart: (Product) => void,
};

const App: (Props) => React$Node = ({
  availableSizes,
  products,
  selectedSizes,
  sortBy,
  cart,
  onSelectSize,
  onSort,
  toggleItemOnCart,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    if (cart.length === 0 && modalOpen) {
      setModalOpen(false);
    }
  }, [cart, modalOpen]);

  const renderCartButton = (): React$Node => (
    <>
      {cart.length ? (
        <div className="cart-button-container">
          <button className="cart-button" onClick={toggleModal}>
            <CartIcon count={cart.length} />
          </button>
        </div>
      ) : null}
    </>
  );

  const isSizeSelected = (size: Size): boolean => selectedSizes.includes(size);

  const renderSizeButton = (size, i: number): React$Node => (
    <button
      key={i}
      className={`size-button${isSizeSelected(size) ? ' selected' : ''}`}
      onClick={() => onSelectSize(size)}>
      <span className="size-text">{size}</span>
    </button>
  );

  const renderPrice = (currency: string, price: string = '0.0'): React$Node => {
    const [whole = '', decimal = ''] = formatPrice(price);

    return (
      <>
        {currency} <span className="price-whole">{whole}</span>.{decimal}
      </>
    );
  };

  const renderProductCard = (p): React$Node => (
    <div key={p.id} className="product-card">
      <div className="product-card-body">
        {p.isFreeShipping && <div className="shipping-tag">Free shipping</div>}
        <img src={p.src_1} alt={p.title} />
        <p className="product-title">{p.title}</p>
        <div className="divider" />
        <p className="price">{renderPrice(p.currencyFormat, `${p.price}`)}</p>
      </div>
      <div className="product-card-footer">
        <button
          className="add-to-cart-button"
          onClick={() => toggleItemOnCart(p)}>
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <>
      {renderCartButton()}
      <div className="page-container">
        <aside>
          <p className="font-weight-bold">Sizes:</p>
          <div className="sizes-container">
            {availableSizes.map(renderSizeButton)}
          </div>
        </aside>
        <main>
          <header className="action-bar">
            <p>{products.length} Product(s) found.</p>
            <div className="select-container">
              <label>Order by </label>
              <select
                value={sortBy}
                onChange={({ target: { value } }) => onSort(value)}>
                <option value="">Select</option>
                <option value="low">Lowest to highest</option>
                <option value="high">Highest to lowest</option>
              </select>
            </div>
          </header>
          <div className="products-container">
            {products.map(renderProductCard)}
          </div>
        </main>
      </div>
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        cart={cart}
        toggleItemOnCart={toggleItemOnCart}
      />
    </>
  );
};

export default App;
