/*
    need way to
        select current dataset
*/

import { useState } from "react";

const datasets = [
  { displayName: "Fall Enrollment", id: "fall" },
  { displayName: "Spring Enrollment", id: "spring" },
  { displayName: "Summer Enrollment", id: "summer" },
  { displayName: "Degrees Awarded", id: "degrees" },
  { displayName: "Retention Rates", id: "retention" },
  { displayName: "Graduation Rates", id: "graduation" },
  { displayName: "Credit Hours", id: "hours" },
];

export const Random = () => {
  const [selectedDatasetID, setSelectedDatasetID] = useState(datasets[0].id);
  return <></>;
};
