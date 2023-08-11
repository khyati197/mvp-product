import React, { useState } from "react";
import { Button, Box, Modal, TextField, Grid } from "@mui/material";

const EditTodo = ({ rowData, selectedTodo, setIsEditing }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [Title, setEditedTitle] = useState(selectedTodo.Title);
  const [Description, setEditedDescription] = useState(
    selectedTodo.Description
  );
  const [Date, setEditedDate] = useState(selectedTodo.Date);

  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = {
      Title,
      Description,
      Date,
    };
    for (let i = 0; i < rowData.length; i++) {
      if (rowData[i].Title === selectedTodo.Title) {
        rowData[i] = todo;
      }
    }
    setIsEditing(false);
  };

  return (
    <>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Title"
                  label="Title"
                  variant="outlined"
                  fullWidth
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
                  value={Description}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={Date}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EditTodo;
