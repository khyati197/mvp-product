import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const TodoList = ({ rowData, columns, handelEdit, handleDelete }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState(""); // Step 1

  const sortedRows = [...rowData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredRows = sortedRows.filter(
    (row) =>
      row.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = prevSelectedRows.includes(rowId)
        ? prevSelectedRows.filter((id) => id !== rowId)
        : [...prevSelectedRows, rowId];
      return updatedSelectedRows;
    });
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="my-4 w-100 "
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              {columns.map((column) => (
                <TableCell   key={column.field}>
                  <TableSortLabel
                    active={sortConfig.key === column.field}
                    direction={sortConfig.direction}
                    onClick={() => handleSort(column.field)}
                  >
                    {column.field}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.Title}
                className={selectedRows.includes(row.id) ? "selected-row" : ""}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </TableCell>
                <TableCell>{row.Title}</TableCell>
                <TableCell>{row.Description}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell className="d-flex">
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton onClick={() => handelEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TodoList;
