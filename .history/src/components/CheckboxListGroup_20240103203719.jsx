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
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            defaultChecked=""
            type="checkbox"
            defaultValue=""
          />
          <span>
            First checkbox
            <small className="d-block text-body-secondary">
              With support text underneath to add more detail
            </small>
          </span>
        </label>
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            type="checkbox"
            defaultValue=""
          />
          <span>
            Second checkbox
            <small className="d-block text-body-secondary">
              Some other text goes here
            </small>
          </span>
        </label>
        <label className="list-group-item d-flex gap-2">
          <input
            className="form-check-input flex-shrink-0"
            type="checkbox"
            defaultValue=""
          />
          <span>
            Third checkbox
            <small className="d-block text-body-secondary">
              And we end with another snippet of text
            </small>
          </span>
        </label>
      </div>
    </>
  );
};
