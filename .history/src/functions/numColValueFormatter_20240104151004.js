export const numColValueFormatter = ({
  ratesBoolean,
  measureValue,
  totalValue,
  measure,
  value,
}) =>
  (ratesBoolean
    ? measureValue / totalValue
    : Math.round(measureValue)
  ).toLocaleString();
