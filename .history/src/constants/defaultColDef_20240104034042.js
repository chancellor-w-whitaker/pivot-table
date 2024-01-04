import { toTitleCase } from "../functions/toTitleCase";

export const defaultColDef = {
  headerValueGetter: ({ colDef: { field } }) => toTitleCase(field),
};
