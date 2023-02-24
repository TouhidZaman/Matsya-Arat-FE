export const getBDFormattedNumber = (number: number) => {
  return parseFloat(number?.toFixed(2))?.toLocaleString();
};

export const formatBangladeshiCurrency = (number: number) =>
  `${getBDFormattedNumber(number) || "0.00"} Taka`;
