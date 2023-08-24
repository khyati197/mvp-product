import React, { useState } from "react";
import StickyNote from "./StickyNote";
import { Container, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { notesDefData } from "./NotesMockData";
const NotesData = () => {
  const notesData = localStorage.getItem("notes");
  const [notes, setNotes] = useState(JSON.parse(notesData) || notesDefData);
  const addNote = () => {
    const newNote = {
      id: generateUniqueId(),
      text: "",
      color: "#ffcc00",
    };
    const updatedNotes = [...notes, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <Container className="app">
      <div className="d-flex align-items-center">
        <Typography variant="h5" component="h5" color="primary">
          NOTES
        </Typography>
        <Tooltip title="Add Notes">
          <IconButton onClick={addNote}>
            <AddCircleSharpIcon sx={{ fontSize: "40px" }} color="primary" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="d-flex flex-wrap">
        {notes.map((note) => (
          <StickyNote key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </Container>
  );
};

export default NotesData;

// Use a function to generate a unique id
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
