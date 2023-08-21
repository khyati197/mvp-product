import React, { useState } from "react";
import { Button, Box, Modal, TextField, Grid } from "@mui/material";

const AddNewTodo = ({ rows, newTodoItem, setOpen }) => {
  const [formData, setFormData] = useState({
    id: generateUniqueId(),
    Title: "",
    Description: "",
    dueDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    rows.push(formData);
    setOpen(false);
    newTodoItem(rows);
    localStorage.setItem("dataList", JSON.stringify(rows));
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
          open={true}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={formData.Title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={formData.Description}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dueDate"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddNewTodo;

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
