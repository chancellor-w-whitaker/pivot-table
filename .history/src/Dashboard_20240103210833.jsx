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
      <div className="d-flex gap-3 flex-wrap">
        <div className="d-flex flex-column gap-1">
          {isLengthyArray(datasetOptions) && <div>Dataset:</div>}
          <RadioListGroup
            setCheckedValue={setCheckedDataset}
            checkedValue={checkedDataset}
            options={datasetOptions}
            className="shadow-sm"
            name="dataset"
          ></RadioListGroup>
        </div>
        <div className="d-flex flex-column gap-1">
          {isLengthyArray(measureRadioOptions) && <div>Measure:</div>}
          <RadioListGroup
            setCheckedValue={setCheckedMeasure}
            options={measureRadioOptions}
            checkedValue={checkedMeasure}
            className="shadow-sm"
            name="measure"
          ></RadioListGroup>
        </div>
        <div className="d-flex flex-column gap-1">
          {isLengthyArray(summaryColumnsCheckboxOptions) && (
            <div>Summary Columns:</div>
          )}
          <CheckboxListGroup
            setCheckedValues={setCheckedSummaryColumns}
            options={summaryColumnsCheckboxOptions}
            checkedValues={checkedSummaryColumns}
            className="shadow-sm"
          ></CheckboxListGroup>
        </div>
      </div>
    </>
  );
};
