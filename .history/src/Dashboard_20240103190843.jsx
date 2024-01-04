import { useState, useMemo } from "react";

import { RadioListGroup } from "./components/RadioListGroup";
import { datasetOptions } from "./constants/datasetOptions";
import { useData } from "./hooks/useData";
import "./App.css";

const getTypedColumns = (data) => {
  const columnTypes = {};

  data.forEach((row) => {
    Object.keys(row).forEach((key) => {
      const value = row[key];

      const valueType = typeof valyeue;
    });
  });
};

export const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const data = useData(`data/${checkedDataset}.json`);

  console.log(data);

  // ! get list of measures (measures being numeric columns -> so separate columns by type)

  // ! find data columns
  const columns = useMemo(
    () =>
      !(Array.isArray(data) && data.length > 0) ? [] : Object.keys(data[0]),
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
