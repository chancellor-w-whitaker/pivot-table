/*
    need way to
      change dataset
      change measure
*/

import { useEffect, useState } from "react";

const datasets = [
  { displayName: "Fall Enrollment", id: "fall" },
  { displayName: "Spring Enrollment", id: "spring" },
  { displayName: "Summer Enrollment", id: "summer" },
  { displayName: "Degrees Awarded", id: "degrees" },
  { displayName: "Retention Rates", id: "retention" },
  { displayName: "Graduation Rates", id: "graduation" },
  { displayName: "Credit Hours", id: "hours" },
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

          const keys = Object.keys(json[0]);
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
