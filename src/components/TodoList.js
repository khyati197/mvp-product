import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const TodoList = ({ rowData, columns, handelEdit, handleDelete }) => {
  const [rows, setRows] = useState(rowData);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedRows = [...rows].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setRows(sortedRows);
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
    setDraggedIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      return;
    }

    const updatedRows = [...rows];
    const [draggedRow] = updatedRows.splice(draggedIndex, 1);
    updatedRows.splice(index, 0, draggedRow);
    setRows(updatedRows);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>
                {" "}
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
          {rows.map((row, index) => (
            <TableRow
              key={row.Title}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={(event) => handleDragOver(event, index)}
              onDragEnd={handleDragEnd}
            >
              <TableCell>{row.Title}</TableCell>
              <TableCell>{row.Description}</TableCell>
              <TableCell>{row.Date}</TableCell>
              <TableCell>
                <DeleteOutlineIcon onClick={() => handleDelete(row.Title)} />
                <EditIcon onClick={() => handelEdit(row.Title)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoList;
