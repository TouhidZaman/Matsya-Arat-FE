export const getBDFormattedNumber = (number: number) => {
  return parseFloat(number?.toFixed(2))?.toLocaleString("bn-BD");
};

export const formatBangladeshiCurrency = (number: number) =>
  `${getBDFormattedNumber(number) || "0.00"} টাকা`;

export const getFormattedQuantity = (number: number) =>
  `${getBDFormattedNumber(number) || "0.00"} কেজি`;
