import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// Create new GridExample component
export const GridExample = (props) => {
  // Container: Defines the grid's theme & dimensions.
  return <AgGridReact {...props} />;
};
