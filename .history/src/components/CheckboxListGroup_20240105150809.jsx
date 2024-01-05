import { startTransition, memo } from "react";

import { isLengthyString } from "../functions/isLengthyString";

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
