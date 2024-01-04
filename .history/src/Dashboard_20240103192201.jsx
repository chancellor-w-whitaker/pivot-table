import { useState, useMemo } from "react";

import { RadioListGroup } from "./components/RadioListGroup";
import { datasetOptions } from "./constants/datasetOptions";
import { useData } from "./hooks/useData";
import "./App.css";

const getTypedColumns = (data) => {
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

  const columnTypeCounts = getColumnTypeCounts();
};

export const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const data = useData(`data/${checkedDataset}.json`);

  console.log(data);

  // ! get list of measures (measures being numeric columns -> so separate columns by type)

  // ! find data columns
  const columns = useMemo(
    () =>
      !(Array.isArray(data) && data.length > 0) ? [] : getTypedColumns(data),
    [data]
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
