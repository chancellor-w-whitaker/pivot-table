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

function useData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
}

export const Random = () => {
  const [selectedDatasetID, setSelectedDatasetID] = useState(datasets[0].id);

  return <></>;
};
