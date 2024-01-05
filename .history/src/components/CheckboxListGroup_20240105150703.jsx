import { startTransition, memo } from "react";

import { isLengthyString } from "../functions/isLengthyString";

const CheckboxListGroupItem = ({ setCheckedValues, checked, label, value }) => {
  const onOptionChange = (e) =>
    startTransition(() =>
      setCheckedValues((priorSet) => {
        const nextSet = new Set(priorSet);

        const value = e.target.value;

        priorSet.has(value) ? nextSet.delete(value) : nextSet.add(value);

        return nextSet;
      })
    );

  return (
    <>
      <label className="list-group-item d-flex gap-2" key={value}>
        <input
          className="form-check-input flex-shrink-0"
          onChange={onOptionChange}
          checked={checked}
          type="checkbox"
          value={value}
        />
        <span>{label}</span>
      </label>
    </>
  );
};

export const CheckboxListGroup = memo(
  ({ setCheckedValues, checkedValues, className, options }) => {
    const defaultClassName = "list-group";

    const entireClassName = isLengthyString(className)
      ? `${defaultClassName} ${className}`
      : defaultClassName;

    return (
      <>
        <div className={entireClassName}>
          {options?.map(({ value, label }) => (
            <CheckboxListGroupItem
              checked={checkedValues.has(value)}
              key={value}
              {...{ setCheckedValues, value, label }}
            ></CheckboxListGroupItem>
          ))}
        </div>
      </>
    );
  }
);

CheckboxListGroup.displayName = "CheckboxListGroup";