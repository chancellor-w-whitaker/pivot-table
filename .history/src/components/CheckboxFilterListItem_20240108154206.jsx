import { startTransition, memo } from "react";

export const CheckboxListGroupItem = memo(
  ({ setCheckedValues, checked, label, value }) => {
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
  }
);

CheckboxListGroupItem.displayName = "CheckboxListGroupItem";
