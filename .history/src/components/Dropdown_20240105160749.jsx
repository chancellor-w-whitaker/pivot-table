import { memo } from "react";

export const Dropdown = memo(({ menuContent, trigger }) => {
  return (
    <>
      <div className="dropdown">
        {trigger}
        <ul style={{ maxHeight: 300 }} className="dropdown-menu">
          {menuContent}
        </ul>
      </div>
    </>
  );
});

Dropdown.displayName = "Dropdown";
