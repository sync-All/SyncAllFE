const Currencyformatter = (amount: string) => {
  return Number(amount).toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
};

export default Currencyformatter;
