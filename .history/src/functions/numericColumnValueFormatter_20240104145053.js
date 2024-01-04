export const numericColumnValueFormatter = ({ value }) =>
  (dataContainsRates
    ? value?.[checkedMeasure] / value?.total
    : Math.round(value?.[checkedMeasure])
  ).toLocaleString();
