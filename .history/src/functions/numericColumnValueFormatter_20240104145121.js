export const numericColumnValueFormatter = (
  { value },
  measure,
  rateCondition
) =>
  (rateCondition
    ? value?.[measure] / value?.total
    : Math.round(value?.[measure])
  ).toLocaleString();
