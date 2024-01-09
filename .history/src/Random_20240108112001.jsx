/*
    need way to
      change dataset
      change measure
*/

import { useCallback, useEffect, useState } from "react";

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
  const [selectedDatasetID, setSelectedDatasetID] = useState(datasets[4].id);

  const selectedDataset = datasets.find(({ id }) => id === selectedDatasetID);

  const jsonHandler = useCallback((json) => {
    // get field type counts
    const fieldTypeCounts = {};

    // accumulate counts
    json.forEach((row) => {
      Object.keys(row).forEach((field) => {
        if (!(field in fieldTypeCounts)) fieldTypeCounts[field] = {};

        const value = row[field];

        const type = typeof value;

        if (!(type in fieldTypeCounts[field])) fieldTypeCounts[field][type] = 0;

        fieldTypeCounts[field][type] += 1;
      });
    });

    // convert to typed columns
    const typedColumns = Object.entries(fieldTypeCounts).map(
      ([field, typeCounts]) => ({
        type: Object.entries(typeCounts)
          .sort((arrA, arrB) => arrB[1] - arrA[1])
          .find(([type]) => type === "string" || type === "number")?.[0],
        field,
      })
    );

    // get summary columns
    const summaryColumns = typedColumns.filter(
      ({ field, type }) => type === "string" && field !== pivotField
    );

    return typedColumns;
  }, []);

  const data = useData(`data/${selectedDatasetID}.json`, jsonHandler);

  console.log(data);

  return <></>;
};

const useData = (url, jsonHandler) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      let ignore = false;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(
              typeof jsonHandler === "function" ? jsonHandler(json) : json
            );
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url, jsonHandler]);

  return data;
};
