// @flow
import React, { useEffect, useState } from 'react';
import _sortBy from 'lodash.sortby';
import App from './components/App';
import { getAvailableSizes, getProducts } from './utils/contentProvider';
import type { Product, Products, Size } from './types';

const AppContainer: () => React$Node = () => {
  const [availableSizes] = useState(getAvailableSizes());

  const [products] = useState(getProducts());

  const [selectedSizes, setSelectedSizes] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState(getProducts());

  const [sortBy, setSortBy] = useState('');

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const filterBySizes = (p: Products): Products =>
      selectedSizes.length
        ? p.filter(({ availableSizes }) =>
            availableSizes.some((s) => selectedSizes.includes(s)),
          )
        : p;

    const sortByPrice = (p: Products): Products => {
      switch (sortBy) {
        case 'low':
          return _sortBy(p, (c) => c.price);

        case 'high':
          return _sortBy(p, (c) => c.price).reverse();

        default:
          return p;
      }
    };

    const removeCartItems = (p: Products): Products =>
      cart.length
        ? p.filter(({ id }) => !cart.map(({ id }) => id).includes(id))
        : p;

    const compose = (...fns: Array<Function>) => (p: Products): Products =>
      fns.reduce((a, c) => c(a), p);

    const newFilteredProducts = compose(
      filterBySizes,
      sortByPrice,
      removeCartItems,
    )(products);

    setFilteredProducts(newFilteredProducts);
  }, [selectedSizes, sortBy, cart, products]);

  const onSelectSize = (size: Size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const onSort = (sort: string) => {
    setSortBy(sort);
  };

  const toggleItemOnCart = (p: Product) => {
    if (cart.map(({ id }) => id).includes(p.id)) {
      setCart([...cart.filter(({ id }) => id !== p.id)]);
    } else {
      setCart([...cart, p]);
    }
  };

  return (
    <App
      availableSizes={availableSizes}
      products={filteredProducts}
      selectedSizes={selectedSizes}
      sortBy={sortBy}
      cart={cart}
      onSelectSize={onSelectSize}
      onSort={onSort}
      toggleItemOnCart={toggleItemOnCart}
    />
  );
};

export default AppContainer;
