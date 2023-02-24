export const getColumnTotal = (tableData: any, columnKey: string) => {
  let total = 0;
  if (Array.isArray(tableData)) {
    tableData.forEach((row) => {
      total += row?.[columnKey] || 0;
    });
    return total;
  }
  return total;
};

export default getColumnTotal;
