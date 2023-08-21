import React, { useState } from "react";
import { dataGroup } from "./TodoMockData";
import TodoList from "./TodoList";
import AddTodoBtn from "./AddTodoBtn";
import AddNewTodo from "./AddNewTodo";
import EditTodo from "./EditTodo";
import Swal from "sweetalert2";

const TodoData = () => {
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
        const updatedTodoData = rowData.filter((todo) => todo.id !== id);
        setRowData(updatedTodoData);
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
      {/* TODO add button  */}
      <AddTodoBtn open={setOpen} />
      {/* TODO list table component */}
      <TodoList
        rowData={rowData}
        columns={dataGroup.colData}
        handelEdit={handleEdit}
        handleDelete={handleDelete}
      />
      ;{/* add new TODO component  */}
      {open && (
        <AddNewTodo rows={rowData} newTodoItem={setRowData} setOpen={setOpen} />
      )}
      {/* edit TODO component  */}
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

export default TodoData;
