import {
  useLayoutEffect,
  startTransition,
  useCallback,
  useState,
  useMemo,
} from "react";

import { deriveValuesFromData } from "./functions/deriveValuesFromData";
import { getPivotColumnDefs } from "./functions/getPivotColumnDefs";
import { CheckboxListGroup } from "./components/CheckboxListGroup";
import { getChartOptions } from "./functions/getChartOptions";
import { RadioListGroup } from "./components/RadioListGroup";
import { datasetOptions } from "./constants/datasetOptions";
import { isLengthyArray } from "./functions/isLengthyArray";
import { wrapBreakpoint } from "./constants/wrapBreakpoint";
import { defaultColDef } from "./constants/defaultColDef";
import { pivotData } from "./functions/pivotData";
import { Chart } from "./components/Chart";
import { useData } from "./hooks/useData";
import { Grid } from "./components/Grid";
import "./App.css";

/*
! notepad

table
* one measure (make selectable, similar to tabs)
* columns would be different term desc options
* other columns are ones selected
- rates: percent (num/den) (is there an intuitive way to present part of total/total for downloading purposes) (or could change just downloaded data)
- if rate, handle differently

axis
- make y max be max of all values (including regression values)
- make y min be min value with some calculation (maybe 90%)

chart
- change method of zooming in & out & rotating axis
* default to value versus truncated
* wrap text on axis ticks


- two decimal place out on percentages
- adding things to tooltip (find https://chamce-fb.web.app/) 
- predicted (find https://chamce-fb.web.app/)
- regression
- formatting and scaling axes
- NaN in grid
- fix numbers sorting as strings
- some kind of hover/click icon definition
- autosizer
- shrink text & shrink row size in grid
- branding colors
*/

// ! chart should not disappear whenever there are no summary columns active (need to edit pivotData function)
// ! download button?
// ! chart resize bug
// ! summary columns are not ordered
// ! got rid of ag grid console error by changing effects to layout effects, but still have weird grid data flash occur. this might be an example of why you should fetch data & reset states in one event handler instead of in many effects
// ! both use effects could be removed by calculating reset values when fetching data. this means setData would need to be handled in an event handler. furthermore, all data derived values could be calculated when gathering data. however, then you would need one use effect to programmatically click the initial dataset button on app start
// ! alternatively, could set initial dataset on grid ready
// ! don't forget about ag grid console error (probably has to do with weird grid flash and may come from your using startTransition)
// ! is rendering performance okay? (do you need to memoize components?)
// ! should you fetch data in event handler instead? (would then need to simulate a click on dataset option 1 in initial use effect)

export const fetchData = (location, stateSetter) => {
  fetch(location)
    .then((resp) => resp.json())
    .then((data) => stateSetter(data));
};

export const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const [checkedMeasure, setCheckedMeasure] = useState("");

  const [checkedSummaryColumns, setCheckedSummaryColumns] = useState(new Set());

  const [data, setData] = useState([]);

  const onDatasetOptionChange = useCallback(
    (e) => {
      startTransition(() => setCheckedDataset(e.target.value));
      fetchData(`data/${e.target.value}.json`);
    },
    [second]
  );

  //   const data = useData(`data/${checkedDataset}.json`);

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

  const { pivotedData, chartData } = useMemo(
    () =>
      pivotData({ checkedSummaryColumns, measureOptions, pivotColumn, data }),
    [data, pivotColumn, measureOptions, checkedSummaryColumns]
  );

  const chartOptions = useMemo(
    () =>
      getChartOptions({
        dataContainsRates,
        checkedMeasure,
        pivotColumn,
        chartData,
      }),
    [chartData, checkedMeasure, pivotColumn, dataContainsRates]
  );

  useLayoutEffect(() => {
    const resetRadioState = (arr) =>
      isLengthyArray(arr) && setCheckedMeasure(arr[0].value);

    resetRadioState(measureOptions);
  }, [measureOptions]);

  useLayoutEffect(() => {
    const resetCheckboxState = (arr) =>
      isLengthyArray(arr) && setCheckedSummaryColumns(new Set([arr[0].value]));

    resetCheckboxState(summaryColumnOptions);
  }, [summaryColumnOptions]);

  return (
    <>
      <div
        className={`d-flex gap-3 flex-wrap-reverse flex-${wrapBreakpoint}-nowrap`}
      >
        <div
          className={`text-bg-secondary d-flex gap-3 p-3 rounded shadow-sm flex-row flex-${wrapBreakpoint}-column flex-wrap flex-fill`}
        >
          <div className="d-flex flex-column gap-2">
            {isLengthyArray(datasetOptions) && (
              <div className="lh-1 fs-5">Dataset</div>
            )}
            <RadioListGroup
              onOptionChange={onDatasetOptionChange}
              setCheckedValue={setCheckedDataset}
              className="shadow-sm text-nowrap"
              checkedValue={checkedDataset}
              options={datasetOptions}
              name="dataset"
            ></RadioListGroup>
          </div>
          <div className="d-flex flex-column gap-2">
            {isLengthyArray(measureOptions) && (
              <div className="lh-1 fs-5">Measure</div>
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
              <div className="lh-1 fs-5">Summary Columns</div>
            )}
            <CheckboxListGroup
              setCheckedValues={setCheckedSummaryColumns}
              checkedValues={checkedSummaryColumns}
              className="shadow-sm text-nowrap"
              options={summaryColumnOptions}
            ></CheckboxListGroup>
          </div>
        </div>
        <div className="text-bg-secondary d-flex gap-3 p-3 rounded shadow-sm flex-column w-100">
          <div className="d-flex flex-column gap-2">
            <div className="lh-1 fs-5">Bar Chart</div>
            <div className="rounded shadow-sm overflow-hidden w-100">
              <Chart options={chartOptions}></Chart>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="lh-1 fs-5">Pivot Table</div>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
              <Grid
                defaultColDef={defaultColDef}
                columnDefs={pivotColumnDefs}
                rowData={pivotedData}
              ></Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};