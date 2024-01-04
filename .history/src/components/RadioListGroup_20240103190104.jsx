import { startTransition } from "react";

import { checkIfLengthyString } from "../functions/checkIfLengthyString";

export const RadioListGroup = ({
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
