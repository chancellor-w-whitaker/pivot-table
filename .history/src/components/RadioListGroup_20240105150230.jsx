import { startTransition, memo } from "react";

import { isLengthyString } from "../functions/isLengthyString";

const RadioListGroupItem = memo(
  ({ setCheckedValue, checked, value, label, name }) => {
    const onOptionChange = (e) =>
      startTransition(() => setCheckedValue(e.target.value));

    return (
      <>
        <label className="list-group-item d-flex gap-2" key={value}>
          <input
            className="form-check-input flex-shrink-0"
            onChange={onOptionChange}
            checked={checked}
            value={value}
            type="radio"
            name={name}
          />
          <span>{label}</span>
        </label>
      </>
    );
  }
);

RadioListGroupItem.displayName = "RadioListGroupItem";

export const RadioListGroup = memo(
  ({ setCheckedValue, checkedValue, className, options, name }) => {
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
            <RadioListGroupItem
              checked={value === checkedValue}
              key={value}
              {...{ setCheckedValue, value, label, name }}
            ></RadioListGroupItem>
          ))}
        </div>
      </>
    );
  }
);

RadioListGroup.displayName = "RadioListGroup";
