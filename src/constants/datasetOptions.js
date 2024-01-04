export const datasetOptions = [
  { label: "Fall Enrollment", pivotColumn: "termDesc", value: "fall" },
  { label: "Spring Enrollment", pivotColumn: "termDesc", value: "spring" },
  { label: "Summer Enrollment", pivotColumn: "termDesc", value: "summer" },
  { label: "Degrees Awarded", pivotColumn: "year", value: "degrees" },
  {
    pivotColumn: "retention_year",
    label: "Retention Rates",
    value: "retention",
  },
  {
    pivotColumn: "cohort_term",
    label: "Graduation Rates",
    value: "graduation",
  },
  { label: "Credit Hours", pivotColumn: "year", value: "hours" },
];
