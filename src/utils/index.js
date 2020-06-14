// @flow

export function formatPrice(price: string): Array<string> {
  const [whole = '', decimal = ''] = price.split('.');

  return [whole, decimal.padEnd(2, '0')];
}
