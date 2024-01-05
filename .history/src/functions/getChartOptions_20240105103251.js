export const getChartOptions = ({
  dataContainsRates,
  checkedMeasure,
  pivotColumn,
  chartData,
}) => {
  const formatNumber = (value) =>
    dataContainsRates
      ? value.toLocaleString("en", {
          style: "percent",
        })
      : Math.round(value).toLocaleString();

  return {
    // Series: Defines which chart type and data to use
    series: [
      {
        tooltip: {
          renderer: ({ datum, xKey, yKey }) => {
            return { content: formatNumber(datum[yKey]), title: datum[xKey] };
          },
        },
        label: {
          formatter: ({ value }) => formatNumber(value),
        },
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
  };
};
