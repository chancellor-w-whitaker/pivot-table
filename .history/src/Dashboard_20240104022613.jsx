import { useEffect, useState, useMemo } from "react";

import { deriveValuesFromData } from "./functions/deriveValuesFromData";
import { CheckboxListGroup } from "./components/CheckboxListGroup";
import { RadioListGroup } from "./components/RadioListGroup";
import { datasetOptions } from "./constants/datasetOptions";
import { isLengthyArray } from "./functions/isLengthyArray";
import { GridExample } from "./components/GridExample";
import { useData } from "./hooks/useData";
import "./App.css";

const wrapBreakpoint = "lg";

// ! create pivot table
// ! handle rate datasets

// ! is rendering performance okay? (do you need to memoize components?)
// ! should you fetch data in event handler instead? (would then need to simulate a click on dataset option 1 in initial use effect)

export const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const [checkedMeasure, setCheckedMeasure] = useState("");

  const [checkedSummaryColumns, setCheckedSummaryColumns] = useState(new Set());

  const data = useData(`data/${checkedDataset}.json`);

  const pivotColumn = datasetOptions.find(
    ({ value }) => value === checkedDataset
  ).pivotColumn;

  const {
    summaryColumnOptions,
    measureOptions,
    // summaryColumns,
    // pivotValues,
  } = useMemo(
    () =>
      !isLengthyArray(data) ? {} : deriveValuesFromData(data, pivotColumn),
    [data, pivotColumn]
  );

  const pivotedData = useMemo(() => {
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

            currentRoot[measure] += numericValue;
          });
        }
      });
    });

    return magicArray;
  }, [data, pivotColumn, measureOptions, checkedSummaryColumns]);

  console.log(pivotedData);

  useEffect(() => {
    const resetRadioState = (arr) =>
      isLengthyArray(arr) && setCheckedMeasure(arr[0].value);

    resetRadioState(measureOptions);
  }, [measureOptions]);

  useEffect(() => {
    const resetCheckboxState = (arr) =>
      isLengthyArray(arr) && setCheckedSummaryColumns(new Set([arr[0].value]));

    resetCheckboxState(summaryColumnOptions);
  }, [summaryColumnOptions]);

  return (
    <>
      <div
        className={`d-flex flex-wrap-reverse flex-${wrapBreakpoint}-nowrap gap-3`}
      >
        <div
          className={`d-flex gap-3 flex-row flex-wrap flex-${wrapBreakpoint}-column p-3 rounded shadow-sm flex-fill`}
        >
          <div className="d-flex flex-column gap-2">
            {isLengthyArray(datasetOptions) && (
              <div className="lh-1">Dataset:</div>
            )}
            <RadioListGroup
              setCheckedValue={setCheckedDataset}
              className="shadow-sm text-nowrap"
              checkedValue={checkedDataset}
              options={datasetOptions}
              name="dataset"
            ></RadioListGroup>
          </div>
          <div className="d-flex flex-column gap-2">
            {isLengthyArray(measureOptions) && (
              <div className="lh-1">Measure:</div>
            )}
            <RadioListGroup
              setCheckedValue={setCheckedMeasure}
              className="shadow-sm text-nowrap"
              checkedValue={checkedMeasure}
              options={measureOptions}
              name="measure"
            ></RadioListGroup>
          </div>
          <div className="d-flex flex-column gap-2">
            {isLengthyArray(summaryColumnOptions) && (
              <div className="lh-1">Summary Columns:</div>
            )}
            <CheckboxListGroup
              setCheckedValues={setCheckedSummaryColumns}
              checkedValues={checkedSummaryColumns}
              className="shadow-sm text-nowrap"
              options={summaryColumnOptions}
            ></CheckboxListGroup>
          </div>
        </div>
        <GridExample></GridExample>
      </div>
    </>
  );
};
