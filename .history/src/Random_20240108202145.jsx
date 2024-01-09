/*
    need way to
      change dataset
      change measure
*/

import { useCallback, useEffect, useState } from "react";

export const Random = () => {
  const [selectedDatasetID, setSelectedDatasetID] = useState(datasets[0].id);

  const [filterBy, setFilterBy] = useState({});

  const [groupBy, setGroupBy] = useState([]);

  const [sumUp, setSumUp] = useState([]);

  const { pivotField } = datasets.find(({ id }) => id === selectedDatasetID);

  const onJsonReceived = useCallback(
    (data, setData) => {
      // will gather column information in here
      const columnLookup = {};

      // gathering column information
      data.forEach((row) => {
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

      // columns & their derived information
      const columns = Object.entries(columnLookup).map(
        ([field, { values, types }]) => ({
          type: Object.entries(types)
            .sort((arrA, arrB) => arrB[1] - arrA[1])
            .find(([type]) => type === "string" || type === "number")[0],
          values,
          field,
        })
      );

      // columns to be used for purposes involving text display
      const textColumns = columns.filter(({ type }) => type === "string");

      // columns to be used for purposed involving aggregation
      const numberColumns = columns.filter(({ type }) => type === "number");

      // options for stateful lists in app
      const options = {
        groupBy: textColumns
          .filter(({ field }) => field !== pivotField)
          .map(({ field }) => field),
        sumUp: numberColumns
          .filter(({ field }) => field !== pivotField)
          .map(({ field }) => field),
        filterBy: Object.fromEntries(
          textColumns.map(({ values, field }) => [field, [...values]])
        ),
      };

      // set first group by option to group by state when data gets reset
      setGroupBy([options.groupBy[0]]);

      // record data & options in state
      setData({ options, data });

      // set first sum up options to sum up state when data gets reset
      setSumUp([options.sumUp[0]]);

      setFilterBy();
    },
    [pivotField]
  );

  const appState = useData(`data/${selectedDatasetID}.json`, onJsonReceived);

  console.log(appState);

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
