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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Swal from "sweetalert2";

const TodoList = ({ rowData, columns, handelEdit }) => {
  const [sortedRows, setSortedRows] = useState([...rowData]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const sorted = [...sortedRows].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortedRows(sorted);
  };

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = prevSelectedRows.includes(rowId)
        ? prevSelectedRows.filter((id) => id !== rowId)
        : [...prevSelectedRows, rowId];
      return updatedSelectedRows;
    });
  };

  const handleDragStart = (e, rowId) => {
    e.dataTransfer.setData("rowId", rowId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetRowId) => {
    const sourceRowId = e.dataTransfer.getData("rowId");
    const sourceIndex = sortedRows.findIndex((row) => row.id === sourceRowId);
    const targetIndex = sortedRows.findIndex((row) => row.id === targetRowId);

    const updatedSortedRows = [...sortedRows];
    const [movedRow] = updatedSortedRows.splice(sourceIndex, 1);
    updatedSortedRows.splice(targetIndex, 0, movedRow);

    setSortedRows(updatedSortedRows);
  };

  //  TODO delete function with alert message
  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const updatedTodoData = sortedRows.filter((todo) => todo.id !== id);
        setSortedRows(updatedTodoData);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Reacord has been deleted.`,
          showConfirmButton: false,
          timer: 1000,
        });
        localStorage.setItem("dataList", JSON.stringify(updatedTodoData));
      }
    });
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
              .map((row) => (
                <TableRow
                  key={row.id}
                  className={
                    selectedRows.includes(row.id) ? "selected-row" : ""
                  }
                >
                  <TableCell
                    draggable
                    onDragStart={(e) => handleDragStart(e, row.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, row.id)}
                  >
                    <DragIndicatorIcon
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Tooltip on bottom"
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleCheckboxChange(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.Title}</TableCell>
                  <TableCell>{row.Description.slice(0, 15) + ".."}</TableCell>
                  <TableCell>{row.dueDate}</TableCell>
                  <TableCell>
                    <div className="d-flex">
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
                    </div>
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
