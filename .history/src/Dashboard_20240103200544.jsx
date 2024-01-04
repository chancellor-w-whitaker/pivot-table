import { useState, useMemo } from "react";

import { RadioListGroup } from "./components/RadioListGroup";
import { datasetOptions } from "./constants/datasetOptions";
import { useData } from "./hooks/useData";
import "./App.css";

const getColumns = (data, pivotColumn) => {
  const countTypesAndFindPivotValues = (
    data,
    validTypes = new Set(["number", "string"])
  ) => {
    const colTypesObject = {};

    const pivotValues = new Set();

    data.forEach((row) => {
      Object.keys(row).forEach((column) => {
        const value = row[column];

        const type = typeof value;

        if (!validTypes.has(type)) return;

        if (!(column in colTypesObject)) colTypesObject[column] = {};

        if (!(type in colTypesObject[column])) colTypesObject[column][type] = 0;

        colTypesObject[column][type] += 1;

        if (column === pivotColumn) pivotValues.add(value);
      });
    });

    return {
      columnTypesCounted: colTypesObject,
      setOfPivotValues: pivotValues,
    };
  };

  const { columnTypesCounted, setOfPivotValues } =
    countTypesAndFindPivotValues(data);

  const getMostFrequentType = (typesObject) =>
    Object.entries(typesObject).sort(
      (entryA, entryB) => entryB[1] - entryA[1]
    )[0][0];

  const typedCols = Object.entries(columnTypesCounted)
    .map(([field, types]) => ({
      type: getMostFrequentType(types),
      field,
    }))
    .filter(({ field }) => field !== pivotColumn);

  const measureCols = typedCols
    .filter(({ type }) => type === "number")
    .map(({ field }) => field);

  const summaryCols = typedCols
    .filter(({ type }) => type === "string")
    .map(({ field }) => field);

  return {
    pivotValues: [...setOfPivotValues],
    measureColumns: measureCols,
    summaryColumns: summaryCols,
  };
};

export const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const [checkedMeasure, setCheckedMeasure] = useState("");

  const [checkedSummaryColumns, setCheckedSummaryColumns] = useState(new Set());

  const data = useData(`data/${checkedDataset}.json`);

  console.log(data);

  const pivotColumn = datasetOptions.find(
    ({ value }) => value === checkedDataset
  ).pivotColumn;

  const { measureColumns, summaryColumns, pivotValues } = useMemo(
    () =>
      !(Array.isArray(data) && data.length > 0)
        ? []
        : getColumns(data, pivotColumn),
    [data, pivotColumn]
  );

  console.log(measureColumns, summaryColumns, pivotValues);

  return (
    <>
      <RadioListGroup
        setCheckedValue={setCheckedDataset}
        checkedValue={checkedDataset}
        options={datasetOptions}
        className="shadow-sm"
        name="dataset"
      ></RadioListGroup>
      <RadioListGroup
        options={measureColumns.map((value) => ({ label: value, value }))}
        setCheckedValue={setCheckedMeasure}
        checkedValue={checkedMeasure}
        className="shadow-sm"
        name="measure"
      ></RadioListGroup>
    </>
  );
};
