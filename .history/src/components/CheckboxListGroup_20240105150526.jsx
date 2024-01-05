import { startTransition, memo } from "react";

import { isLengthyString } from "../functions/isLengthyString";

const CheckboxListGroupItem = () => {
  return (
    <>
      <label className="list-group-item d-flex gap-2" key={value}>
        <input
          className="form-check-input flex-shrink-0"
          checked={checkedValues.has(value)}
          onChange={onOptionChange}
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
    const onOptionChange = (e) =>
      startTransition(() =>
        setCheckedValues((priorSet) => {
          const nextSet = new Set(priorSet);

          const value = e.target.value;

          priorSet.has(value) ? nextSet.delete(value) : nextSet.add(value);

          return nextSet;
        })
      );

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
                onChange={onOptionChange}
                type="checkbox"
                value={value}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </>
    );
  }
);

CheckboxListGroup.displayName = "CheckboxListGroup";
