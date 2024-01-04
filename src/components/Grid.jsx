import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { memo } from "react";

// Create new Grid component
export const Grid = memo((props) => {
  // Container: Defines the grid's theme & dimensions.
  return <AgGridReact {...props} />;
});

Grid.displayName = "Grid";
