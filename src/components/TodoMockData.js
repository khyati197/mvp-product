const columns = [
  { field: "Title" },
  { field: "Description" },
  { field: "dueDate" },
];

const rows = [
  { id: 1, Title: "today", Description: "John", dueDate: "2023-08-11" },
  { id: 2, Title: "next day", Description: "Alice", dueDate: "2023-08-12" },
  { id: 3, Title: "first day", Description: "Bob", dueDate: "2023-08-19" },
];

const dataGroup = {
  colData: columns,
  rowData: rows,
};

export { dataGroup };
