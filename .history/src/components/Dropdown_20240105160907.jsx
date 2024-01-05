import { memo } from "react";

export const Dropdown = memo(({ menuContent, trigger }) => {
  return (
    <>
      <div className="dropdown dropend">
        {trigger}
        <ul className="dropdown-menu">{menuContent}</ul>
      </div>
    </>
  );
});

Dropdown.displayName = "Dropdown";
