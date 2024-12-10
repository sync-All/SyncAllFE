const Currencyformatter = (amount: number) => {
  return Number(amount).toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
};

export default Currencyformatter;
