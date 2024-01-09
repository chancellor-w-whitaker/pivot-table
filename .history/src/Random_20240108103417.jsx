/*
    need way to
      change dataset
      change measure
*/

import { useEffect, useState } from "react";

const datasets = [
  { displayName: "Fall Enrollment", pivotField: "termDesc", id: "fall" },
  { displayName: "Spring Enrollment", pivotField: "termDesc", id: "spring" },
  { displayName: "Summer Enrollment", pivotField: "termDesc", id: "summer" },
  { displayName: "Degrees Awarded", pivotField: "year", id: "degrees" },
  {
    displayName: "Retention Rates",
    pivotField: "retention_year",
    id: "retention",
  },
  {
    displayName: "Graduation Rates",
    pivotField: "cohort_term",
    id: "graduation",
  },
  { displayName: "Credit Hours", pivotField: "year", id: "hours" },
];

export const Random = () => {
  const [selectedDatasetID, setSelectedDatasetID] = useState(datasets[0].id);

  const data = useData(`data/${selectedDatasetID}.json`);

  return <></>;
};

const useData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          // find measures
          const lookup = {};

          json.forEach((row) => {
            Object.keys(row).forEach((field) => {
              if (!(field in lookup)) lookup[field] = {};

              const value = row[field];

              const type = typeof value;

              if (!(type in lookup[field])) lookup[field][type] = 0;

              lookup[field][type] += 1;
            });
          });

          console.log(lookup);

          setData(json);
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
};
