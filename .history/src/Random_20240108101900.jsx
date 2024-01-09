/*
    need way to
      change dataset
      change measure
*/

import { useEffect, useState } from "react";

const datasets = [
  { displayName: "Fall Enrollment", pivotField: "", id: "fall" },
  { displayName: "Spring Enrollment", pivotField: "", id: "spring" },
  { displayName: "Summer Enrollment", pivotField: "", id: "summer" },
  { displayName: "Degrees Awarded", id: "degrees", pivotField: "" },
  { displayName: "Retention Rates", id: "retention", pivotField: "" },
  { displayName: "Graduation Rates", id: "graduation", pivotField: "" },
  { displayName: "Credit Hours", pivotField: "", id: "hours" },
];

const useData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);

          console.log(json);

          const keys = Object.keys(json[0]);

          console.log(keys);
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
};

export const Random = () => {
  const [selectedDatasetID, setSelectedDatasetID] = useState(datasets[0].id);

  const data = useData(`data/${selectedDatasetID}.json`);

  return <></>;
};
