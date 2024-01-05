import { getRegressionResult } from "./getRegressionResult";
import { toTitleCase } from "./toTitleCase";

export const getChartOptions = ({
  dataContainsRates,
  checkedRegression,
  checkedMeasure,
  datasetTitle,
  pivotColumn,
  chartData,
}) => {
  const formatNumber = (value) =>
    dataContainsRates
      ? value.toLocaleString("en", {
          style: "percent",
        })
      : Math.round(value).toLocaleString();

  const dataOption = chartData;

  const regressionData = dataOption.map((obj, index) => [
    index + 1,
    obj[checkedMeasure],
  ]);

  const regressionResult = getRegressionResult(
    checkedRegression,
    regressionData
  );

  const finalData = dataOption.map((obj, index) => ({
    ...obj,
    "regression value": regressionResult.points[index][1],
  }));

  return {
    // Series: Defines which chart type and data to use
    series: [
      {
        label: {
          formatter: ({ value, datum, yKey }) =>
            `${datum[yKey] / datum.total} (${
              datum[yKey] + " / " + datum.total
            })`,
        },
        tooltip: {
          renderer: ({ datum, xKey, yKey }) => {
            return { content: formatNumber(datum[yKey]), title: datum[xKey] };
          },
        },
        yKey: checkedMeasure,
        xKey: pivotColumn,
        type: "bar",
      },
      {
        tooltip: {
          renderer: ({ datum, xKey, yKey }) => {
            return { content: formatNumber(datum[yKey]), title: datum[xKey] };
          },
        },
        label: {
          formatter: ({ value }) => formatNumber(value),
        },
        yKey: "regression value",
        xKey: pivotColumn,
        type: "line",
      },
    ],
    axes: [
      {
        title: {
          text: toTitleCase(pivotColumn),
        },
        position: "bottom",
        type: "category",
      },
      {
        label: {
          formatter: ({ value }) => formatNumber(value),
        },
        title: {
          text: toTitleCase(checkedMeasure),
        },
        position: "left",
        type: "number",
      },
    ],
    title: {
      text: datasetTitle,
    },
    // Data: Data to be displayed in the chart
    data: finalData,
    // container: <div className="rounded shadow-sm overflow-hidden w-100"></div>,
    // width: "100%",
  };
};
