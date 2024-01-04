import { useEffect, useState, useMemo } from "react";

import { deriveValuesFromData } from "./functions/deriveValuesFromData";
import { getPivotColumnDefs } from "./functions/getPivotColumnDefs";
import { CheckboxListGroup } from "./components/CheckboxListGroup";
import { RadioListGroup } from "./components/RadioListGroup";
import { datasetOptions } from "./constants/datasetOptions";
import { isLengthyArray } from "./functions/isLengthyArray";
import { wrapBreakpoint } from "./constants/wrapBreakpoint";
import { defaultColDef } from "./constants/defaultColDef";
import { toTitleCase } from "./functions/toTitleCase";
import { pivotData } from "./functions/pivotData";
import { useData } from "./hooks/useData";
import { Grid } from "./components/Grid";
import "./App.css";

// ! create pivot table
// ! handle rate datasets

// ! is rendering performance okay? (do you need to memoize components?)
// ! should you fetch data in event handler instead? (would then need to simulate a click on dataset option 1 in initial use effect)

export const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const [checkedMeasure, setCheckedMeasure] = useState("");

  const [checkedSummaryColumns, setCheckedSummaryColumns] = useState(new Set());

  const data = useData(`data/${checkedDataset}.json`);

  const currentDataset = datasetOptions.find(
    ({ value }) => value === checkedDataset
  );

  const pivotColumn = currentDataset.pivotColumn;

  const dataContainsRates = currentDataset.containsRates;

  const {
    summaryColumnOptions,
    setOfSummaryColumns,
    measureOptions,
    allColumnDefs,
  } = useMemo(
    () =>
      !isLengthyArray(data) ? {} : deriveValuesFromData(data, pivotColumn),
    [data, pivotColumn]
  );

  const pivotColumnDefs = useMemo(
    () =>
      getPivotColumnDefs({
        checkedSummaryColumns,
        setOfSummaryColumns,
        dataContainsRates,
        checkedMeasure,
        allColumnDefs,
      }),
    [
      allColumnDefs,
      checkedMeasure,
      dataContainsRates,
      setOfSummaryColumns,
      checkedSummaryColumns,
    ]
  );

  const pivotedData = useMemo(
    () =>
      pivotData({ checkedSummaryColumns, measureOptions, pivotColumn, data }),
    [data, pivotColumn, measureOptions, checkedSummaryColumns]
  );

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
        <div className="rounded shadow-sm p-3 w-100 d-flex flex-column gap-2">
          <div className="lh-1">Pivot Table:</div>
          <div className="ag-theme-quartz" style={{ height: 500 }}>
            <Grid
              defaultColDef={defaultColDef}
              columnDefs={pivotColumnDefs}
              rowData={pivotedData}
            ></Grid>
          </div>
        </div>
      </div>
    </>
  );
};
