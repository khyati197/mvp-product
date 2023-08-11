import React, { useState } from "react";
import { Button, Box, Modal, TextField, Grid } from "@mui/material";

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

const AddNewTodo = ({ rows, newTodoItem, setOpen }) => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    rows.push(formData);
    newTodoItem(rows);
    setOpen(false);
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
                  value={formData.Title}
                  onChange={handleChange}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={formData.Date}
                  onChange={handleChange}
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

export default AddNewTodo;
