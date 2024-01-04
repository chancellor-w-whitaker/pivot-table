import { startTransition } from "react";

import { isLengthyString } from "../functions/isLengthyString";

export const CheckboxListGroup = ({
  setCheckedValues,
  checkedValues,
  className,
  options,
  name,
}) => {
  const onOptionChange = (e) =>
    startTransition(() => setCheckedValues(e.target.value));

  const defaultClassName = "list-group";

  const entireClassName = isLengthyString(className)
    ? `${defaultClassName} ${className}`
    : defaultClassName;

  return (
    <>
      <div className={entireClassName}>
        {options?.map(({ value, label }) => (
          <label className="list-group-item d-flex gap-2" key={value}>
            <input
              className="form-check-input flex-shrink-0"
              checked={checkedValues.has(value)}
              type="checkbox"
              value={value}
            />
            <span>
              {label}
              <small className="d-block text-body-secondary">
                With support text underneath to add more detail
              </small>
            </span>
          </label>
        ))}
      </div>
    </>
  );
};
