export const numColValueFormatter = ({ ratesBoolean, measure, value }) =>
  (ratesBoolean
    ? value?.[measure] / value?.total
    : Math.round(value?.[measure])
  ).toLocaleString();
