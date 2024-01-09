import { startTransition, memo } from "react";

export const CheckboxListGroupItem = memo(
  ({ setCheckedValues, checked, value, name }) => {
    const onOptionChange = (e) =>
      startTransition(() =>
        setCheckedValues((priorState) => {
          const nextState = { ...priorState };

          nextState[name] = { ...nextState[name] };

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
            name={name}
          />
          <span>{value}</span>
        </label>
      </>
    );
  }
);

CheckboxListGroupItem.displayName = "CheckboxListGroupItem";
