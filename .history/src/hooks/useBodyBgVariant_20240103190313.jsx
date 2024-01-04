import { useEffect } from "react";

import { checkIfLengthyString } from "../functions/checkIfLengthyString";

export const useBodyBgVariant = (variant = "body-tertiary") => {
  useEffect(() => {
    const variantIsLengthyString = checkIfLengthyString(variant);

    variantIsLengthyString && document.body.classList.add(`bg-${variant}`);

    return () => {
      variantIsLengthyString && document.body.classList.remove(`bg-${variant}`);
    };
  }, [variant]);
};
