import React, { useState } from "react";
import { dataGroup } from "./mockData";
import TodoList from "./TodoList";
import AddTodoBtn from "./AddTodoBtn";
import AddNewTodo from "./AddNewTodo";
import EditTodo from "./EditTodo";
import Swal from "sweetalert2";
const MvpData = () => {
  const tableData = localStorage.getItem("dataList");
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState(JSON.parse(tableData));
  const [selectedTodo, setSelectedTodo] = useState(null);
  const handleEdit = (id) => {
    const [rowData] = JSON.parse(tableData).filter(
      (rowData) => rowData.id === id
    );
    setSelectedTodo(rowData);
    setIsEditing(true);
  };

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
        const updatedTodoData = rowData.filter((todo) => todo.id !== id);
        setRowData(updatedTodoData);
        console.log(rowData, "data");

        localStorage.setItem("dataList", JSON.stringify(updatedTodoData));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Reacord has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <AddTodoBtn open={setOpen} />
      <TodoList
        rowData={rowData}
        columns={dataGroup.colData}
        handelEdit={handleEdit}
        handleDelete={handleDelete}
      />
      ;
      {open && (
        <AddNewTodo rows={rowData} newTodoItem={setRowData} setOpen={setOpen} />
      )}
      {isEditing && (
        <EditTodo
          rowData={rowData}
          selectedTodo={selectedTodo}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default MvpData;
