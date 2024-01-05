import { startTransition, memo } from "react";

export const RadioListGroupItem = memo(
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
