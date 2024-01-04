import { AgChartsReact } from "ag-charts-react";
import { memo } from "react";

export const Chart = memo((props) => {
  return <AgChartsReact {...props} />;
});

Chart.displayName = "Chart";
