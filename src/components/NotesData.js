import React, { useState } from "react";
import StickyNote from "./StickyNote";
import { Container, Typography, IconButton } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

const NotesData = () => {
  const notesData = localStorage.getItem("notes");
  const [notes, setNotes] = useState(JSON.parse(notesData) || []);

  const addNote = () => {
    const newNote = {
      id: generateUniqueId(), // Use a function to generate a unique id
      text: "",
      color: "#ffcc00",
    };
    const updatedNotes = [...notes, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    console.log(updatedNotes, "notes");
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
        <IconButton onClick={addNote}>
          <AddCircleSharpIcon sx={{ fontSize: "40px" }} color="primary" />
        </IconButton>
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

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
