import React, { useState } from "react";
import { dataGroup } from "./mockData";
import TodoList from "./TodoList";
import AddTodoBtn from "./AddTodoBtn";
import AddNewTodo from "./AddNewTodo";
import EditTodo from "./EditTodo";

const MvpData = () => {
  const tableData = localStorage.getItem("dataList");
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState(JSON.parse(tableData));
  const [selectedTodo, setSelectedTodo] = useState(null);
  const handleEdit = (id) => {
    const [rowData] = JSON.parse(tableData).filter((rowData) => rowData.id === id);
    setSelectedTodo(rowData);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setRowData(rowData.filter((todo) => todo.id !== id));
    console.log(rowData, "data");
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
