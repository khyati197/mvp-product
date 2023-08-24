import React from "react";
import { IconButton, Typography, Tooltip } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

const AddTodoBtn = ({ open }) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <Typography variant="h5" component="h5" color="primary">
          TODOS
        </Typography>
        <Tooltip title="Add Todo">
          <IconButton onClick={() => open(true)}>
            <AddCircleSharpIcon sx={{ fontSize: "40px" }} color="primary" />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default AddTodoBtn;
