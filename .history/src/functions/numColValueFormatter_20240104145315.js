export const numColValueFormatter = (val, measure, doesDataContainRates) =>
  (doesDataContainRates
    ? value?.[measure] / value?.total
    : Math.round(value?.[measure])
  ).toLocaleString();
