export const numColValueFormatter = ({
  ratesBoolean,
  measureValue,
  totalValue,
}) =>
  (ratesBoolean
    ? measureValue / totalValue
    : Math.round(measureValue)
  ).toLocaleString();
