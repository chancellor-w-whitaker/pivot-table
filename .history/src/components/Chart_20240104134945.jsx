"use strict";

import { AgChartsReact } from "ag-charts-react";
import { createRoot } from "react-dom/client";
import React, { useState } from "react";

const ChartExample = () => {
  const [options, setOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
      { iceCreamSales: 162000, month: "Jan", avgTemp: 2.3 },
      { iceCreamSales: 302000, month: "Mar", avgTemp: 6.3 },
      { iceCreamSales: 800000, avgTemp: 16.2, month: "May" },
      { iceCreamSales: 1254000, avgTemp: 22.8, month: "Jul" },
      { iceCreamSales: 950000, avgTemp: 14.5, month: "Sep" },
      { iceCreamSales: 200000, month: "Nov", avgTemp: 8.9 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ yKey: "iceCreamSales", xKey: "month", type: "bar" }],
  });

  return <AgChartsReact options={options} />;
};

const root = createRoot(document.getElementById("root"));
root.render(<ChartExample />);