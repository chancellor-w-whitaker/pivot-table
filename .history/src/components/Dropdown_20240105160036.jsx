import { memo } from "react";

export const Dropdown = memo(({ menuContent, trigger }) => {
  return (
    <>
      <div className="dropdown">
        {trigger}
        <ul
          className="dropdown-menu overflow-y-scroll"
          style={{ maxHeight: 300 }}
        >
          {menuContent}
        </ul>
      </div>
    </>
  );
});

Dropdown.displayName = "Dropdown";
