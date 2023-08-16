import React from "react";
import { notes } from "./NotesMockData";
import { useState } from "react";
import StickyNote from "./StickyNote";
const NotesData = () => {
  const colors = ["#ffe066", "#ffa3a3", "#a3c4ff", "#6699cc"];
  const [notesData, setnotesData] = useState(notes);
  const handleDeleteNote = (noteId) => {
    setnotesData(notes.filter((note) => note.id !== noteId));
  };
  return (
    <>
      {notesData.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          colors={colors}
          onDelete={() => handleDeleteNote(note.id)}
        />
      ))}
    </>
  );
};

export default NotesData;
