import { useCallback, useEffect, useState } from "react";

// what if you created functions for updating each state and then created a context to use state values, state updaters, & derived values?

export const Random = () => {
  const [datasetID, setDatasetID] = useState(datasets[0].id);
  const [filterBy, setFilterBy] = useState({});
  const [groupBy, setGroupBy] = useState([]);
  const [sumUp, setSumUp] = useState([]);
  const [regressionType, setRegressionType] = useState(regressionTypes[0]);

  const onJsonReceived = useCallback(
    (data, setData) => {
      const { pivotField } = datasets.find(({ id }) => id === datasetID);
      const columnLookup = {};

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

      const columns = Object.entries(columnLookup).map(
        ([field, { values, types }]) => ({
          type: Object.entries(types)
            .sort((arrA, arrB) => arrB[1] - arrA[1])
            .find(([type]) => type === "string" || type === "number")[0],
          values,
          field,
        })
      );

      const textColumns = columns.filter(({ type }) => type === "string");
      const numberColumns = columns.filter(({ type }) => type === "number");

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

      setGroupBy([options.groupBy[0]]);
      setSumUp([options.sumUp[0]]);
      setFilterBy(
        Object.fromEntries(
          textColumns.map(({ values, field }) => [field, new Set(values)])
        )
      );

      setRegressionType(regressionTypes[0]);
      setData({ options, data });
    },
    [datasetID]
  );

  const appState = useData(`data/${datasetID}.json`, onJsonReceived);

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

const regressionTypes = [
  "linear",
  "exponential",
  "logarithmic",
  "power",
  "polynomial",
];

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
