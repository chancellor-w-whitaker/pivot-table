export const pivotData = ({
  checkedSummaryColumns,
  measureOptions,
  pivotColumn,
  data,
}) => {
  const magicArray = [];

  const tree = {};

  const checkedSumColsArr = [...checkedSummaryColumns];

  data?.forEach((row) => {
    let currentRoot = tree;

    const pivotValue = row[pivotColumn];

    const entries = [];

    checkedSumColsArr.forEach((column, index) => {
      const isLastIndex = index === checkedSumColsArr.length - 1;

      const colValue = row[column];

      entries.push([column, colValue]);

      if (!(colValue in currentRoot)) {
        if (isLastIndex) {
          currentRoot[colValue] = Object.fromEntries(entries);

          magicArray.push(currentRoot[colValue]);
        } else {
          currentRoot[colValue] = {};
        }
      }

      currentRoot = currentRoot[colValue];

      if (isLastIndex) {
        if (!(pivotValue in currentRoot)) currentRoot[pivotValue] = {};

        currentRoot = currentRoot[pivotValue];

        measureOptions.forEach(({ value: measure }) => {
          const numericValue = row[measure];

          if (!(measure in currentRoot)) currentRoot[measure] = 0;

          if (typeof numericValue === "number")
            currentRoot[measure] += numericValue;
        });
      }
    });
  });

  const node = {};

  const chartData = [];

  magicArray.forEach((row) => {
    Object.entries(row).forEach(([key, objectOrString]) => {
      if (typeof objectOrString === "object") {
        if (!(key in node)) {
          node[key] = { ...objectOrString, [pivotColumn]: key };

          chartData.push(node[key]);
        } else {
          Object.entries(objectOrString).forEach(([meas, measValue]) => {
            if (typeof measValue === "number") node[key][meas] += measValue;
          });
        }
      }
    });
  });

  return { pivotedData: magicArray, chartData };
};
