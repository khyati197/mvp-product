import React, { useState } from "react";
import StickyNote from "./StickyNote";
import { Container, Typography, IconButton } from "@mui/material";
// import { notesDefData } from './NotesMockData'
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

const NotesData = () => {
  const notesData = localStorage.getItem("notes");
  const [notes, setNotes] = useState(JSON.parse(notesData));

  const addNote = () => {
    const newNote = {
      id: notes.length + 1,
      text: "",
      color: "#ffcc00",
    };
    const updatedNotes = [...notes, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    console.log(updatedNotes, "updatedNotes");
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
