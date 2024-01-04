import { numColValueFormatter } from "./numColValueFormatter";

export const getPivotColumnDefs = ({
  checkedSummaryColumns,
  setOfSummaryColumns,
  dataContainsRates,
  checkedMeasure,
  allColumnDefs,
}) => {
  return allColumnDefs
    ?.filter(
      ({ field }) =>
        !setOfSummaryColumns.has(field) || checkedSummaryColumns.has(field)
    )
    .map((object) =>
      setOfSummaryColumns.has(object.field)
        ? object
        : {
            ...object,
            valueFormatter: ({ value }) =>
              numColValueFormatter({
                ratesBoolean: dataContainsRates,
                measure: checkedMeasure,
                value,
              }),
            type: "numericColumn",
          }
    );
};
