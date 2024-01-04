import { useEffect, useState } from "react";

import { Container } from "./Container";
import "./App.css";

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

const RadioListGroup = ({ setCheckedValue, checkedValue, options, name }) => {
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
  { value: "fall", label: "One" },
  { value: "spring", label: "Two" },
  { value: "summer", label: "Three" },
  { value: "summer", label: "Three" },
  { value: "summer", label: "Three" },
  { value: "summer", label: "Three" },
  { value: "summer", label: "Three" },
  { value: "summer", label: "Three" },
];

const Dashboard = () => {
  const [checkedValue, setCheckedValue] = useState();

  const data = useData("data/fall.json");

  // console.log(data);

  return (
    <>
      <RadioListGroup
        options={[
          { value: "one", label: "One" },
          { value: "two", label: "Two" },
          { value: "three", label: "Three" },
        ]}
        setCheckedValue={setCheckedValue}
        checkedValue={checkedValue}
        name={"dataset"}
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
