import React, { useState } from "react";
import { Button, Box, Modal, TextField, Grid } from "@mui/material";

const EditTodo = ({ rowData, selectedTodo, setIsEditing }) => {
  const id = selectedTodo.id;
  const [Title, setEditedTitle] = useState(selectedTodo.Title);
  const [Description, setEditedDescription] = useState(
    selectedTodo.Description
  );
  const [dueDate, setEditedDate] = useState(selectedTodo.dueDate);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTodo = {
      id,
      Title,
      Description,
      dueDate,
    };

    const updatedData = JSON.parse(localStorage.getItem("dataList")).map(
      (todo) => {
        if (todo.id === selectedTodo.id) {
          for (let i = 0; i < rowData.length; i++) {
            return (rowData[i] = updatedTodo);
          }
        }
        return todo;
      }
    );
    localStorage.setItem("dataList", JSON.stringify(updatedData));
    setIsEditing(false);
  };

  return (
    <>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="boxlayout"
          sx={{
            bgcolor: "background.default",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  value={Title}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                  value={Description}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dueDate"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={dueDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3 me-3"
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="mt-3"
              onClick={() => setIsEditing(false)}
            >
              Cancle
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditTodo;
