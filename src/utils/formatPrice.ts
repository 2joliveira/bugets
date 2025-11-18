export function formatPrice(price: number) {
  const formatedPrice = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return formatedPrice;
}
