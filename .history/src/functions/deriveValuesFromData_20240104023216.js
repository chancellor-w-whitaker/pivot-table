import { toTitleCase } from "./toTitleCase";

export const deriveValuesFromData = (data, pivotColumn) => {
  const countTypesAndFindPivotValues = (
    data,
    validTypes = new Set(["number", "string"])
  ) => {
    const colTypesObject = {};

    const pivotValues = new Set();

    data.forEach((row) => {
      Object.keys(row).forEach((column) => {
        const value = row[column];

        const type = typeof value;

        if (!validTypes.has(type)) return;

        if (!(column in colTypesObject)) colTypesObject[column] = {};

        if (!(type in colTypesObject[column])) colTypesObject[column][type] = 0;

        colTypesObject[column][type] += 1;

        if (column === pivotColumn) pivotValues.add(value);
      });
    });

    return {
      columnTypesCounted: colTypesObject,
      setOfPivotValues: pivotValues,
    };
  };

  const { columnTypesCounted, setOfPivotValues } =
    countTypesAndFindPivotValues(data);

  const getMostFrequentType = (typesObject) =>
    Object.entries(typesObject).sort(
      (entryA, entryB) => entryB[1] - entryA[1]
    )[0][0];

  const typedCols = Object.entries(columnTypesCounted)
    .map(([field, types]) => ({
      type: getMostFrequentType(types),
      field,
    }))
    .filter(({ field }) => field !== pivotColumn);

  const measureColumns = typedCols.filter(({ type }) => type === "number");

  const summaryColumns = typedCols.filter(({ type }) => type === "string");

  const getListGroupOpts = (arr) =>
    arr.map(({ field }) => ({
      label: toTitleCase(field),
      value: field,
    }));

  const summaryColumnOptions = getListGroupOpts(summaryColumns);

  const measureOptions = getListGroupOpts(measureColumns);

  const pivotValues = [...setOfPivotValues];

  const columnDefs = [...summaryColumns.m];

  return {
    summaryColumnOptions,
    measureOptions,
    pivotValues,
  };
};
