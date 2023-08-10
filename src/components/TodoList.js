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
const TodoList = ({ rows, columns }) => {
  // const localData = localStorage.getItem("dataList");
  // console.log(JSON.parse(localData), "localData");
  const [data, setData] = useState([...rows]);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    const sortedData = [...data].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("dragIndex", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();
    const dragIndex = event.dataTransfer.getData("dragIndex");
    const updatedData = [...data];
    const [draggedItem] = updatedData.splice(dragIndex, 1);
    updatedData.splice(index, 0, draggedItem);
    setData(updatedData);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {column.field}
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderBy === column.field ? order : "asc"}
                    onClick={() => handleSort(column.field)}
                  />
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.Title}
                draggable
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop(index)}
              >
                <TableCell>{row.Title}</TableCell>
                <TableCell>{row.Description}</TableCell>
                <TableCell>{row.Date}</TableCell>
                <TableCell>
                  {" "}
                  <DeleteOutlineIcon />
                  <EditIcon />
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
