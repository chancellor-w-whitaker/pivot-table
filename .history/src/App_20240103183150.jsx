import { useEffect, useState } from "react";

import { Container } from "./Container";
import "./App.css";

const checkIfLengthyString = (string) =>
  typeof variant === "string" && string.length > 0;

const useBodyBgVariant = (variant = "body-tertiary") => {
  useEffect(() => {
    const variantIsLengthyString =
      typeof variant === "string" && variant.length > 0;

    variantIsLengthyString && document.body.classList.add(`bg-${variant}`);

    return () => {
      variantIsLengthyString && document.body.classList.remove(`bg-${variant}`);
    };
  }, [variant]);
};

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

const RadioListGroup = ({
  setCheckedValue,
  checkedValue,
  className,
  options,
  name,
}) => {
  const onOptionChange = (e) => setCheckedValue(e.target.value);

  return (
    <>
      <div className="list-group">
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

const datasetOptions = [
  { label: "Fall Enrollment", value: "fall" },
  { label: "Spring Enrollment", value: "spring" },
  { label: "Summer Enrollment", value: "summer" },
  { label: "Degrees Awarded", value: "degrees" },
  { label: "Retention Rates", value: "retention" },
  { label: "Graduation Rates", value: "graduation" },
  { label: "Credit Hours", value: "hours" },
];

const Dashboard = () => {
  const [checkedDataset, setCheckedDataset] = useState(datasetOptions[0].value);

  const data = useData(`data/${checkedDataset}.json`);

  // console.log(data);

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

const App = () => {
  useBodyBgVariant("primary-subtle");

  return (
    <>
      <Container>
        <Dashboard></Dashboard>
      </Container>
    </>
  );
};

export default App;