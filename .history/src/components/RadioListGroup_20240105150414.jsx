import { memo } from "react";

import { isLengthyString } from "../functions/isLengthyString";
import { RadioListGroupItem } from "./RadioListGroupItem";

export const RadioListGroup = memo(
  ({ setCheckedValue, checkedValue, className, options, name }) => {
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
