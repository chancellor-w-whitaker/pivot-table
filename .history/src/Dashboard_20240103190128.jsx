import { useState, useMemo } from "react";
import { startTransition } from "react";

import { checkIfLengthyString } from "./functions/checkIfLengthyString";
import { useData } from "./hooks/useData";
import "./App.css";

// ! constants
const datasetOptions = [
  { label: "Fall Enrollment", pivotColumn: "termDesc", value: "fall" },
  { label: "Spring Enrollment", pivotColumn: "termDesc", value: "spring" },
  { label: "Summer Enrollment", pivotColumn: "termDesc", value: "summer" },
  { label: "Degrees Awarded", pivotColumn: "year", value: "degrees" },
  {
    pivotColumn: "retention_year",
    label: "Retention Rates",
    value: "retention",
  },
  {
    pivotColumn: "cohort_term",
    label: "Graduation Rates",
    value: "graduation",
  },
  { label: "Credit Hours", pivotColumn: "year", value: "hours" },
];

// ! hooks

const getColumns = (data) => {};

// ! main
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
