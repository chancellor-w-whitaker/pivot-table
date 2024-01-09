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
    (dataRows, setData) => {
      // find field type counts to separate fields you can group by and fields you can sum up
      const fieldTypeCounts = {};

      // iterate rows to accumulate type counts for each field
      dataRows.forEach((row) => {
        Object.keys(row).forEach((field) => {
          if (!(field in fieldTypeCounts)) fieldTypeCounts[field] = {};

          const value = row[field];

          const type = typeof value;

          if (!(type in fieldTypeCounts[field]))
            fieldTypeCounts[field][type] = 0;

          fieldTypeCounts[field][type] += 1;
        });
      });

      // find most frequent type for each field
      const typedColumns = Object.entries(fieldTypeCounts)
        .map(([field, typeCounts]) => ({
          type: Object.entries(typeCounts)
            .sort((arrA, arrB) => arrB[1] - arrA[1])
            .find(([type]) => type === "string" || type === "number")[0],
          field,
        }))
        .filter(({ field }) => field !== pivotField);

      // find options for stateful components
      const options = {};

      // find fields you can group by
      const groupByOptions = typedColumns
        .filter(({ type }) => type === "string")
        .map(({ field }) => field);

      // find fields you can sum up
      const sumUpOptions = typedColumns
        .filter(({ type }) => type === "number")
        .map(({ field }) => field);

      // save data & derived values to reduce number of hooks used
      setData({ groupByOptions, sumUpOptions, dataRows });
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
