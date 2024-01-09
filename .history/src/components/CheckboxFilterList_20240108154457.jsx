import { memo } from "react";

import { CheckboxFilterListItem } from "./CheckboxFilterListItem";
import { isLengthyString } from "../functions/isLengthyString";

export const CheckboxFilterList = memo(
  ({ setCheckedValues, checkedValues, className, options, name }) => {
    const defaultClassName = "list-group";

    const entireClassName = isLengthyString(className)
      ? `${defaultClassName} ${className}`
      : defaultClassName;

    return (
      <>
        <div className={entireClassName}>
          {options?.map((value) => (
            <CheckboxFilterListItem
              checked={checkedValues[name].has(value)}
              key={value}
              {...{ setCheckedValues, value, name }}
            ></CheckboxFilterListItem>
          ))}
        </div>
      </>
    );
  }
);

CheckboxFilterList.displayName = "CheckboxFilterList";
