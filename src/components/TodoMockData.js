const columns = [
  { field: "Title" },
  { field: "Description" },
  { field: "dueDate" },
];

const rows = [
  {
    id: "r1z006eas",
    Title: "today",
    Description: "John",
    dueDate: "2023-08-11",
  },
  {
    id: "r1z006has",
    Title: "next day",
    Description: "Alice",
    dueDate: "2023-08-12",
  },
  {
    id: "r1z116has",
    Title: "first day",
    Description: "Bob",
    dueDate: "2023-08-19",
  },
];

const dataGroup = {
  colData: columns,
  rowData: rows,
};

export { dataGroup };
