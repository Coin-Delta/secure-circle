export default function FormatCurrency(amount) {
  const number = Number(amount);

  if (isNaN(number)) {
    return 'Invalid amount';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(number);
}
