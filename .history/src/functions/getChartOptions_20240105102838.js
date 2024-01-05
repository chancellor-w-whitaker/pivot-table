export const getChartOptions = ({
  dataContainsRates,
  checkedMeasure,
  pivotColumn,
  chartData,
}) => ({
  // Series: Defines which chart type and data to use
  series: [
    {
      formatter: ({ value }) =>
        dataContainsRates
          ? value.toLocaleString("en", {
              style: "percent",
            })
          : Math.round(value).toLocaleString(),

      yKey: checkedMeasure,
      xKey: pivotColumn,
      type: "bar",
    },
  ],
  // Data: Data to be displayed in the chart
  data: !dataContainsRates
    ? chartData
    : chartData.map((row) => ({
        ...row,
        [checkedMeasure]: row[checkedMeasure] / row.total,
      })),
  // container: <div className="rounded shadow-sm overflow-hidden w-100"></div>,
  // width: "100%",
});
