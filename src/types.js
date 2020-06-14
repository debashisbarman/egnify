// @flow

export type Size = string;

export type AvailableSizes = Array<Size>;

export type Product = {
  id: number,
  title: string,
  description: string,
  availableSizes: AvailableSizes,
  style: string,
  price: number,
  installments: number,
  currencyId: string,
  currencyFormat: string,
  isFreeShipping: boolean,
  src_1: string,
  src_2: string,
};

export type Products = Array<Product>;
