import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState } from "react";

// Create new GridExample component
export const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    {
      location: "Cape Canaveral",
      rocket: "Titan-Centaur ",
      mission: "Voyager",
      date: "1977-09-05",
      successful: true,
      company: "NASA",
      price: 86580000,
    },
    {
      location: "Kennedy Space Center",
      mission: "Apollo 13",
      date: "1970-04-11",
      rocket: "Saturn V",
      successful: false,
      company: "NASA",
      price: 3750000,
    },
    {
      location: "Cape Canaveral",
      mission: "Falcon 9",
      date: "2015-12-22",
      rocket: "Falcon 9",
      company: "SpaceX",
      successful: true,
      price: 9750000,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "price" },
    { field: "successful" },
    { field: "rocket" },
  ]);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className="ag-theme-quartz shadow-sm flex-fill"
      style={{ height: 500 }}
    >
      <AgGridReact columnDefs={colDefs} rowData={rowData} />
    </div>
  );
};
