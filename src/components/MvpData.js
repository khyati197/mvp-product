import React, { useState } from "react";
import { dataGroup } from "./mockData";
import TodoList from "./TodoList";
import AddTodoBtn from "./AddTodoBtn";
import AddNewTodo from "./AddNewTodo";
import EditTodo from "./EditTodo";

const MvpData = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [rowData, setRowData] = useState(dataGroup.rowData);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const handleEdit = (Title) => {
    const [rowData] = dataGroup.rowData.filter(
      (rowData) => rowData.Title === Title
    );
    setSelectedTodo(rowData);
    setIsEditing(true);
  };

  const handleDelete = (Title) => {
    const [todo] = rowData.filter((rowData) => rowData.Title === Title);
    console.log(todo, "data", Title);
    setRowData(todo.filter((todo) => todo.Title === Title));
  };
  return (
    <>
      <AddTodoBtn open={setOpen} />
      <TodoList
        rowData={dataGroup.rowData}
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
