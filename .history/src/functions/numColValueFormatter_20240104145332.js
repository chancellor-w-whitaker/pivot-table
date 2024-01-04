export const numColValueFormatter = ({
  doesDataContainRates,
  measure,
  value,
}) =>
  (doesDataContainRates
    ? value?.[measure] / value?.total
    : Math.round(value?.[measure])
  ).toLocaleString();
