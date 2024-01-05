export const getRegressionResult = (type, data) => {
  let result;

  switch (type) {
    case "linear":
      result = regression.linear(data);
      break;
    case "exponential":
      result = regression.exponential(data);
      break;
    case "logarithmic":
      result = regression.logarithmic(data);
      break;
    case "power":
      result = regression.power(data);
      break;
    case "polynomial":
      result = regression.polynomial(data);
      break;
  }

  return result;
};
