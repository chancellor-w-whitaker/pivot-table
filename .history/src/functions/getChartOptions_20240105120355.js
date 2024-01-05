import regression from "regression";

import { toTitleCase } from "./toTitleCase";

const getRegressionResult = (type, data) => {
  let result;

  switch (type) {
    case "linear":
      result = regression.linear(data);
      break;
    case "exponential":
      result = regression.linear(data);
      break;
    case "logarithmic":
      result = regression.linear(data);
      break;
    case "power":
      result = regression.linear(data);
      break;
    case "polynomial":
      result = regression.linear(data);
      break;
    default:
    // code block
  }
};

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

  const dataOption = !dataContainsRates
    ? chartData
    : chartData.map((row) => ({
        ...row,
        [checkedMeasure]: row[checkedMeasure] / row.total,
      }));

  const regressionData = dataOption.map((obj, index) => [
    index + 1,
    obj[checkedMeasure],
  ]);

  const regressionResult = regression.linear(regressionData);

  console.log(regressionResult);

  const finalData = dataOption.map((obj, index) => ({
    ...obj,
    "regression value": regressionResult.points[index][1],
  }));

  console.log(finalData);

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
      {
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
