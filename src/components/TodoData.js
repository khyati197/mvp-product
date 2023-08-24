import React, { useState } from "react";
import { dataGroup } from "./TodoMockData";
import TodoList from "./TodoList";
import AddTodoBtn from "./AddTodoBtn";
import AddNewTodo from "./AddNewTodo";
import EditTodo from "./EditTodo";

const TodoData = () => {
  const tableData = localStorage.getItem("dataList");
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState(
    JSON.parse(tableData) || dataGroup.rowData
  );
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleEdit = (id) => {
    const [rowData] = JSON.parse(tableData).filter(
      (rowData) => rowData.id === id
    );
    setSelectedTodo(rowData);
    setIsEditing(true);
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
