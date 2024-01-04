import { useState, useMemo } from "react";

import { RadioListGroup } from "./components/RadioListGroup";
import { datasetOptions } from "./constants/datasetOptions";
import { useData } from "./hooks/useData";
import "./App.css";

const getColumns = (data, pivotColumn) => {
  const getColumnTypeCounts = (
    data,
    validTypes = new Set(["number", "string"])
  ) => {
    const object = {};

    data.forEach((row) => {
      Object.keys(row).forEach((column) => {
        const value = row[column];

        const type = typeof value;

        if (!validTypes.has(type)) return;

        if (!(column in object)) object[column] = {};

        if (!(type in object[column])) object[column][type] = 0;

        object[column][type] += 1;
      });
    });

    return object;
  };

  const columnTypeCounts = getColumnTypeCounts(data);

  const getMostFrequentType = (singleTypeCountsObj) =>
    Object.entries(singleTypeCountsObj).sort(
      (entryA, entryB) => entryB[1] - entryA[1]
    )[0][0];

  const typedColumns = Object.entries(columnTypeCounts)
    .map(([field, typeCounts]) => ({
      type: getMostFrequentType(typeCounts),
      field,
    }))
    .filter(({ field }) => field !== pivotColumn);

  const measureColumns = typedColumns
    .filter(({ type }) => type === "number")
    .map(({ field }) => field);

  const summaryColumns = typedColumns
    .filter(({ type }) => type === "string")
    .map(({ field }) => field);

  return { measureColumns, summaryColumns };
};

export const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const data = useData(`data/${checkedDataset}.json`);

  const pivotColumn = datasetOptions.find(
    ({ value }) => value === checkedDataset
  ).pivotColumn;

  console.log(data);

  // ! get list of measures (measures being numeric columns -> so separate columns by type)

  // ! find data columns
  const columns = useMemo(
    () =>
      !(Array.isArray(data) && data.length > 0)
        ? []
        : getColumns(data, pivotColumn),
    [data, pivotColumn]
  );

  console.log(columns);

  return (
    <>
      <RadioListGroup
        setCheckedValue={setCheckedDataset}
        checkedValue={checkedDataset}
        options={datasetOptions}
        className="shadow-sm"
        name="dataset"
      ></RadioListGroup>
    </>
  );
};
