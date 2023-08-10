import React, { useState } from "react";
import { dataGroup } from "./mockData";
import TodoList from "./TodoList";
import AddTodoBtn from "./AddTodoBtn";
import AddNewTodo from "./AddNewTodo";

const MvpData = () => {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(dataGroup.rowData);

  return (
    <>
      <AddTodoBtn open={setOpen} />
      <TodoList rows={rowData} columns={dataGroup.colData} />;
      {open && (
        <AddNewTodo
          rowData={rowData}
          newTodoItem={setRowData}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default MvpData;
