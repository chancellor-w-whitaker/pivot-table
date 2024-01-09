/*
    need way to
      change dataset
      change measure
*/

import { useCallback, useEffect, useState } from "react";

export const Random = () => {
  const [selectedDatasetID, setSelectedDatasetID] = useState(datasets[0].id);

  const { pivotField } = datasets.find(({ id }) => id === selectedDatasetID);

  const onJsonReceived = useCallback(
    (data, setData) => {
      const fieldLookup = {};

      data.forEach((row) => {
        Object.keys(row).forEach((field) => {
          if (!(field in fieldLookup))
            fieldLookup[field] = { values: new Set() };

          const value = row[field];

          fieldLookup[field].values.add(value);

          const type = typeof value;

          if (!(type in fieldLookup[field])) fieldLookup[field][type] = 0;

          fieldLookup[field][type] += 1;
        });
      });

      const typedColumns = Object.entries(fieldLookup).map(
        ([field, typeCounts]) => ({
          type: Object.entries(typeCounts)
            .sort((arrA, arrB) => arrB[1] - arrA[1])
            .find(([type]) => type === "string" || type === "number")[0],
          field,
        })
      );

      const options = {
        groupBy: typedColumns
          .filter(
            ({ field, type }) => type === "string" && field !== pivotField
          )
          .map(({ field }) => field),
        sumUp: typedColumns
          .filter(
            ({ field, type }) => type === "number" && field !== pivotField
          )
          .map(({ field }) => field),
      };

      setData({ options, data });
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
