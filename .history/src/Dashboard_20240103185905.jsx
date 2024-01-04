import { useEffect, useState, useMemo } from "react";
import { startTransition } from "react";

import { Container } from "./Container";
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

// ! components
const RadioListGroup = ({
  setCheckedValue,
  checkedValue,
  className,
  options,
  name,
}) => {
  const onOptionChange = (e) =>
    startTransition(() => setCheckedValue(e.target.value));

  const defaultClassName = "list-group";

  const entireClassName = checkIfLengthyString(className)
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <>
      <div className={entireClassName}>
        {options.map(({ value, label }) => (
          <label className="list-group-item d-flex gap-2" key={value}>
            <input
              className="form-check-input flex-shrink-0"
              checked={value === checkedValue}
              onChange={onOptionChange}
              value={value}
              type="radio"
              name={name}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </>
  );
};

// ! hooks

const useData = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
};

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
