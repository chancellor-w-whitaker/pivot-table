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
    (json, setState) => {
      const describeColumns = (rows) => {
        const columnLookup = {};

        rows.forEach((row) => {
          Object.keys(row).forEach((field) => {
            if (!(field in columnLookup)) {
              columnLookup[field] = { values: new Set(), types: {} };
            }

            const { values, types } = columnLookup[field];

            const value = row[field];

            values.add(value);

            const type = typeof value;

            if (!(type in types)) types[type] = 0;

            types[type] += 1;
          });
        });

        return Object.entries(columnLookup).map(
          ([field, { values, types }]) => ({
            type: Object.entries(types)
              .sort((arrA, arrB) => arrB[1] - arrA[1])
              .find(([type]) => type === "string" || type === "number")[0],
            values: [...values].sort(),
            field,
          })
        );
      };

      const findOptions = (columns) => {
        const textColumns = columns.filter(({ type }) => type === "string");

        const numberColumns = columns.filter(({ type }) => type === "number");

        const groupBy = textColumns
          .filter(({ field }) => field !== pivotField)
          .map(({ field }) => field);

        const sumUp = numberColumns
          .filter(({ field }) => field !== pivotField)
          .map(({ field }) => field);

        const filterBy = Object.fromEntries(
          textColumns.map(({ values, field }) => [field, values])
        );

        return { filterBy, groupBy, sumUp };
      };

      const options = findOptions(describeColumns(json));

      setState({ data: json, options });
    },
    [pivotField]
  );

  const state = useData(`data/${selectedDatasetID}.json`, onJsonReceived);

  console.log(state);

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
