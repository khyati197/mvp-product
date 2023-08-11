const columns = [
  { field: "Title" },
  { field: "Description" },
  { field: "Date" },
];

const rows = [
  { Title: "today", Description: "John", Date: "2023-08-11" },
  { Title: "next day", Description: "Alice", Date: "2023-08-12" },
  { Title: "first day", Description: "Bob", Date: "2023-08-19" },
];

const dataGroup = {
  colData: columns,
  rowData: rows,
};
console.log(dataGroup.rowData, "dataGroupdataGroup");
// localStorage.setItem("dataList", JSON.stringify(dataGroup.rowData));
export { dataGroup };
