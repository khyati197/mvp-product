import React from "react";
import { Button } from "@mui/material";

const AddTodoBtn = ({ open }) => {
  return (
    <Button
      onClick={() => open(true)}
      variant="contained"
      color="primary"
    >
      Add NewTodo
    </Button>
  );
};

export default AddTodoBtn;
