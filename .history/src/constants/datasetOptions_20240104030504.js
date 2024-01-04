export const datasetOptions = [
  {
    label: "Fall Enrollment",
    pivotColumn: "termDesc",
    containsRates: false,
    value: "fall",
  },
  {
    label: "Spring Enrollment",
    pivotColumn: "termDesc",
    containsRates: false,
    value: "spring",
  },
  {
    label: "Summer Enrollment",
    pivotColumn: "termDesc",
    containsRates: false,
    value: "summer",
  },
  {
    label: "Degrees Awarded",
    containsRates: false,
    pivotColumn: "year",
    value: "degrees",
  },
  {
    pivotColumn: "retention_year",
    label: "Retention Rates",
    containsRates: true,
    value: "retention",
  },
  {
    pivotColumn: "cohort_term",
    label: "Graduation Rates",
    value: "graduation",
  },
  {
    label: "Credit Hours",
    containsRates: false,
    pivotColumn: "year",
    value: "hours",
  },
];
