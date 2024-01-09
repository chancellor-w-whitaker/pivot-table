import { memo } from "react";

import { CheckboxListGroupItem } from "./CheckboxListGroupItem";
import { isLengthyString } from "../functions/isLengthyString";

export const CheckboxFilterList = memo(
  ({ setCheckedValues, checkedValues, className, options }) => {
    const defaultClassName = "list-group";

    const entireClassName = isLengthyString(className)
      ? `${defaultClassName} ${className}`
      : defaultClassName;

    return (
      <>
        <div className={entireClassName}>
          {options?.map((value) => (
            <CheckboxListGroupItem
              checked={checkedValues.has(value)}
              key={value}
              {...{ setCheckedValues, value }}
            ></CheckboxListGroupItem>
          ))}
        </div>
      </>
    );
  }
);

CheckboxFilterList.displayName = "CheckboxFilterList";
