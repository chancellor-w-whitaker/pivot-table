import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// Create new Grid component
export const Grid = (props) => {
  // Container: Defines the grid's theme & dimensions.
  return <AgGridReact {...props} />;
};
