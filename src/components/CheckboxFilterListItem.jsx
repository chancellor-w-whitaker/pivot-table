import { startTransition, memo } from "react";

export const CheckboxFilterListItem = memo(
  ({ setCheckedValues, checked, value, name }) => {
    const onOptionChange = (e) =>
      startTransition(() =>
        setCheckedValues((priorState) => {
          const nextState = { ...priorState };

          nextState[name] = new Set(nextState[name]);

          const value = e.target.value;

          nextState[name].has(value)
            ? nextState[name].delete(value)
            : nextState[name].add(value);

          return nextState;
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

CheckboxFilterListItem.displayName = "CheckboxFilterListItem";
