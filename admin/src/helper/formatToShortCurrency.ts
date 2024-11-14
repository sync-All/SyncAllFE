const formatToShortCurrency = (amount: number) => {
  if (amount >= 1_000_000_000_000) {
    return `${(amount / 1_000_000_000_000).toFixed(4)}T`; // Trillions with 4 decimals
  } else if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(3)}B`; // Billions with 3 decimals
  } else if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(2)}M`; // Millions with 2 decimals
  } else if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}k`; // Thousands with 1 decimal
  }
  return amount.toLocaleString(); // For values less than 1,000
};

export default formatToShortCurrency;
