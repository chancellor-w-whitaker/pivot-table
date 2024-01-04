export const numColValueFormatter = (
  { value },
  measure,
  doesDataContainRates
) =>
  (doesDataContainRates
    ? value?.[measure] / value?.total
    : Math.round(value?.[measure])
  ).toLocaleString();
