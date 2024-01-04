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
              (dataContainsRates
                ? value?.[checkedMeasure] / value?.total
                : Math.round(value?.[checkedMeasure])
              ).toLocaleString(),
            type: "numericColumn",
          }
    );
};
