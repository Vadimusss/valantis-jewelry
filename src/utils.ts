const getFormatedUtcDate = (): string => {
  const date = new Date();
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const year = utcDate.getFullYear();

  const normalizedMonth = utcDate.getMonth() + 1;
  const month = normalizedMonth.toString().padStart(2, '0');

  const day = utcDate.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
};

const getTotalPageCount = (
  rowCount: number,
  maxProductsOnPage: number,
): number => Math.ceil(rowCount / maxProductsOnPage);

const getDisplayedProductIds = (
  productIds: string[],
  maxProductsOnPage: number,
  currentPage: number,
): string[] => productIds.slice(
  maxProductsOnPage * (currentPage - 1),
  maxProductsOnPage * (currentPage - 1) + (maxProductsOnPage + 1),
);

const validate = (_: string, { product, price, brand }:
  { product: string, price: string, brand: string }) => product !== '' || price !== '' || brand !== '';

export {
  getFormatedUtcDate, getTotalPageCount, getDisplayedProductIds, validate,
};
