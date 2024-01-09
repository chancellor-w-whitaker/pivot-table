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
  const [selectedDatasetID, setSelectedDatasetID] = useState(datasets[0].id);

  const { pivotField } = datasets.find(({ id }) => id === selectedDatasetID);

  const onJsonReceived = useCallback(
    (rows, setData) => {
      // get field type counts
      const fieldTypeCounts = {};

      // accumulate counts
      rows.forEach((row) => {
        Object.keys(row).forEach((field) => {
          if (!(field in fieldTypeCounts)) fieldTypeCounts[field] = {};

          const value = row[field];

          const type = typeof value;

          if (!(type in fieldTypeCounts[field]))
            fieldTypeCounts[field][type] = 0;

          fieldTypeCounts[field][type] += 1;
        });
      });

      // convert to typed columns & remove pivot column
      const typedColumns = Object.entries(fieldTypeCounts)
        .map(([field, typeCounts]) => ({
          type: Object.entries(typeCounts)
            .sort((arrA, arrB) => arrB[1] - arrA[1])
            .find(([type]) => type === "string" || type === "number")[0],
          field,
        }))
        .filter(({ field }) => field !== pivotField);

      // find text fields to be used for grouping purposes
      const textFields = typedColumns
        .filter(({ type }) => type === "string")
        .map(({ field }) => field);

      //
      const numericFields = typedColumns
        .filter(({ type }) => type === "number")
        .map(({ field }) => field);

      setData({ numericFields, textFields, rows });
    },
    [pivotField]
  );

  const data = useData(`data/${selectedDatasetID}.json`, onJsonReceived);

  console.log(data);

  return <></>;
};

const useData = (url, onJsonReceived) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url) {
      let ignore = false;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            typeof onJsonReceived === "function"
              ? onJsonReceived(json, setData)
              : setData(json);
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url, onJsonReceived]);

  return data;
};
