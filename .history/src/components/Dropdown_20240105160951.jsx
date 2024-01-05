import { memo } from "react";

export const Dropdown = memo(({ className = "", menuContent, trigger }) => {
  return (
    <>
      <div className={`dropdown ${className}`}>
        {trigger}
        <ul className="dropdown-menu">{menuContent}</ul>
      </div>
    </>
  );
});

Dropdown.displayName = "Dropdown";
