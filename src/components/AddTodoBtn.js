import React from "react";
import { Button } from "@mui/material";

const AddTodoBtn = ({ open }) => {
  return (
    <Button
      onClick={() => open(true)}
      variant="contained"
      color="primary"
      className="mt-4 me-3"
    >
      Add NewTodo
    </Button>
  );
};

export default AddTodoBtn;
