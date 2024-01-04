import { startTransition, memo } from "react";

import { isLengthyString } from "../functions/isLengthyString";

export const RadioListGroup = memo(
  ({ setCheckedValue, checkedValue, className, doNotShow, options, name }) => {
    const onOptionChange = (e) =>
      startTransition(() => setCheckedValue(e.target.value));

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
  }
);

RadioListGroup.displayName = "RadioListGroup";
