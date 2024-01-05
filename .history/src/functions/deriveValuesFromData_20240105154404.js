import { toTitleCase } from "./toTitleCase";

export const deriveValuesFromData = (data, pivotColumn) => {
  const iterateData = (data, validTypes = new Set(["number", "string"])) => {
    const colTypesObject = {};

    const pivotValues = new Set();

    const filterSets = {};

    data.forEach((row) => {
      Object.keys(row).forEach((column) => {
        const value = row[column];

        const type = typeof value;

        if (!validTypes.has(type)) return;

        if (!(column in colTypesObject)) colTypesObject[column] = {};

        if (!(type in colTypesObject[column])) colTypesObject[column][type] = 0;

        colTypesObject[column][type] += 1;

        if (column === pivotColumn) pivotValues.add(value);

        if (!(column in filterSets)) filterSets[column] = new Set();

        filterSets[column].add(value);
      });
    });

    return {
      columnTypesCounted: colTypesObject,
      setOfPivotValues: pivotValues,
      filterSets,
    };
  };

  const { columnTypesCounted, setOfPivotValues, filterSets } =
    iterateData(data);

  const getMostFrequentType = (typesObject) =>
    Object.entries(typesObject).sort(
      (entryA, entryB) => entryB[1] - entryA[1]
    )[0][0];

  const typedColumns = Object.entries(columnTypesCounted)
    .map(([field, types]) => ({
      type: getMostFrequentType(types),
      field,
    }))
    .filter(({ field }) => field !== pivotColumn);

  const measureColumns = typedColumns.filter(({ type }) => type === "number");

  const summaryColumns = typedColumns.filter(({ type }) => type === "string");

  const setOfSummaryColumns = new Set(summaryColumns.map(({ field }) => field));

  const getListGroupOptions = (arr) =>
    arr.map(({ field }) => ({
      label: toTitleCase(field),
      value: field,
    }));

  const summaryColumnOptions = getListGroupOptions(summaryColumns);

  const measureOptions = getListGroupOptions(measureColumns);

  const pivotValues = [...setOfPivotValues];

  const allColumnDefs = [
    ...summaryColumns.map(({ field }) => ({ field })),
    ...pivotValues.map((field) => ({ field })),
  ];

  measureOptions.forEach(({ value }) => delete filterSets[value]);

  console.log(filterSets);

  const filterArrays = Object.fromEntries(Object.entries(filterSets).map(([key,set])=>([key,[...set].sort()])))

  Object.keys(filterSets).forEach(key=>)

  return {
    summaryColumnOptions,
    setOfSummaryColumns,
    measureOptions,
    allColumnDefs,
  };
};
