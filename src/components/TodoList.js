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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const TodoList = ({ rowData, columns, handelEdit, handleDelete }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState(rowData);

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const [searchQuery, setSearchQuery] = useState(""); // Step 1

  const sortedRows = [...rows].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

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

  const filteredRows = sortedRows.filter(
    (row) =>
      row.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("text/plain");
    const draggedRow = filteredRows[sourceIndex];

    if (+sourceIndex !== targetIndex) {
      const updatedRows = filteredRows.filter(
        (_, index) => index !== +sourceIndex
      );
      updatedRows.splice(targetIndex, 0, draggedRow);

      setRows(updatedRows); // Update the rows state with the new order
    }
  };
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="my-3 w-100 "
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {columns.map((column) => (
                <TableCell key={column.field}>
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
            {sortedRows
              .filter(
                (row) =>
                  row.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  row.Description.toLowerCase().includes(
                    searchQuery.toLowerCase()
                  )
              )
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  className={
                    selectedRows.includes(row.id) ? "selected-row" : ""
                  }
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleCheckboxChange(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.Title}</TableCell>
                  <TableCell>
                    {row.Description.split(" ").slice(0, 10).join(" ")}
                    {/* <span className="full-description">{row.Description}</span> */}
                  </TableCell>
                  <TableCell>{row.dueDate}</TableCell>
                  <TableCell className="d-flex">
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton onClick={() => handelEdit(row.id)}>
                      <EditIcon />
                    </IconButton>
                    {selectedRows.includes(row.id) ? (
                      <IconButton>
                        <CheckCircleIcon className="text-success" />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <CheckCircleIcon className="invisible " />
                      </IconButton>
                    )}
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
