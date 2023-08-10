import React, { useState } from "react";
import { Button, Box, Modal, TextField, Grid } from "@mui/material";
import { dataGroup } from "./mockData";

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

const AddNewTodo = ({ rowData, newTodoItem, setOpen }) => {
  // const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleChange = (event) => {
    console.log(event, "event");
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    rowData.push(formData);
    newTodoItem(rowData);
    setOpen(false);
    console.log(dataGroup, "dataGroup");
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
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={formData.date}
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
