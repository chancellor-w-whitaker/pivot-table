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
  const items = [{ value, id }];
  return (
    <>
      <div className="list-group">
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            id="listGroupRadios1"
            defaultChecked=""
            defaultValue=""
            type="radio"
            name={name}
          />
          <span>First radio</span>
        </label>
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            id="listGroupRadios2"
            defaultValue=""
            type="radio"
            name={name}
          />
          <span>
            Second radio
            <small className="d-block text-body-secondary">
              Some other text goes here
            </small>
          </span>
        </label>
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            id="listGroupRadios3"
            defaultValue=""
            type="radio"
            name={name}
          />
          <span>
            Third radio
            <small className="d-block text-body-secondary">
              And we end with another snippet of text
            </small>
          </span>
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