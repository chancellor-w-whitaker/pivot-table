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

const RadioListGroup = ({ name }) => {
  const [checkedOption, setCheckedOption] = useState("One");

  const onOptionChange = (e) => {
    setCheckedOption(e.target.value);
  };

  const options = [
    { value, label, id },
    { value, label, id },
    { value, label, id },
  ];

  return (
    <>
      <div className="list-group">
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            onChange={onOptionChange}
            id="listGroupRadios1"
            type="radio"
            name={name}
          />
          <span>First radio</span>
        </label>
      </div>
    </>
  );
};

const App = () => {
  useBodyBgVariant("primary-subtle");

  const data = useData("data/fall.json");

  console.log(data);

  return (
    <>
      <Container></Container>
    </>
  );
};

export default App;