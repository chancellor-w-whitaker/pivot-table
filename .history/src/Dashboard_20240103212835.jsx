import { useEffect, useState, useMemo } from "react";

import { deriveValuesFromData } from "./functions/deriveValuesFromData";
import { CheckboxListGroup } from "./components/CheckboxListGroup";
import { RadioListGroup } from "./components/RadioListGroup";
import { datasetOptions } from "./constants/datasetOptions";
import { isLengthyArray } from "./functions/isLengthyArray";
import { useData } from "./hooks/useData";
import "./App.css";

export const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const [checkedMeasure, setCheckedMeasure] = useState("");

  const [checkedSummaryColumns, setCheckedSummaryColumns] = useState(new Set());

  const data = useData(`data/${checkedDataset}.json`);

  const pivotColumn = datasetOptions.find(
    ({ value }) => value === checkedDataset
  ).pivotColumn;

  const {
    summaryColumnsCheckboxOptions,
    measureRadioOptions,
    // measureColumns,
    // summaryColumns,
    // pivotValues,
  } = useMemo(
    () =>
      !isLengthyArray(data) ? {} : deriveValuesFromData(data, pivotColumn),
    [data, pivotColumn]
  );

  useEffect(() => {
    const resetRadioState = (arr) =>
      isLengthyArray(arr) && setCheckedMeasure(arr[0].value);

    resetRadioState(measureRadioOptions);
  }, [measureRadioOptions]);

  useEffect(() => {
    const resetCheckboxState = (arr) =>
      isLengthyArray(arr) && setCheckedSummaryColumns(new Set([arr[0].value]));

    resetCheckboxState(summaryColumnsCheckboxOptions);
  }, [summaryColumnsCheckboxOptions]);

  return (
    <>
      <div className="d-flex flex-wrap flex-lg-nowrap gap-3">
        <div className="d-flex gap-3 flex-row flex-wrap flex-lg-column p-3 rounded shadow-sm">
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
            {isLengthyArray(measureRadioOptions) && (
              <div className="lh-1">Measure:</div>
            )}
            <RadioListGroup
              setCheckedValue={setCheckedMeasure}
              className="shadow-sm text-nowrap"
              options={measureRadioOptions}
              checkedValue={checkedMeasure}
              name="measure"
            ></RadioListGroup>
          </div>
          <div className="d-flex flex-column gap-2">
            {isLengthyArray(summaryColumnsCheckboxOptions) && (
              <div className="lh-1">Summary Columns:</div>
            )}
            <CheckboxListGroup
              setCheckedValues={setCheckedSummaryColumns}
              options={summaryColumnsCheckboxOptions}
              checkedValues={checkedSummaryColumns}
              className="shadow-sm text-nowrap"
            ></CheckboxListGroup>
          </div>
        </div>
        <div className="w-100 shadow-sm rounded"></div>
      </div>
    </>
  );
};
