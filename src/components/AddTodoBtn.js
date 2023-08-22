import React from "react";
import { IconButton, Typography } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

const AddTodoBtn = ({ open }) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <Typography variant="h5" component="h5" color="primary">
          TODOS
        </Typography>
        <IconButton onClick={() => open(true)}>
          <AddCircleSharpIcon sx={{ fontSize: "40px" }} color="primary" />
        </IconButton>
      </div>
    </>
  );
};

export default AddTodoBtn;
