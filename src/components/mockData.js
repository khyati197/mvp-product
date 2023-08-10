const columns = [
  { field: "Title" },
  { field: "Description" },
  { field: "Date" },
];

const rows = [
  { Title: 1, Description: "John", Date: 25 },
  { Title: 2, Description: "Alice", Date: 30 },
  { Title: 3, Description: "Bob", Date: 28 },
];

const dataGroup = {
  colData: columns,
  rowData: rows,
};
console.log(dataGroup.rowData, "dataGroupdataGroup");
// localStorage.setItem("dataList", JSON.stringify(dataGroup.rowData));
export { dataGroup };
