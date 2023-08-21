import React, { useState } from "react";
import { Card, TextareaAutosize } from "@mui/material";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const StickyNote = ({ note, onDelete }) => {
  const [text, setText] = useState(note.text);
  const [color, setColor] = useState(note.color);

  const handleDelete = () => {
    onDelete(note.id);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    updateLocalStorageColor(newColor);
  };

  const updateLocalStorageColor = (newColor) => {
    const updatedNotes = JSON.parse(localStorage.getItem("notes")).map(
      (noteId) =>
        noteId.id === note.id ? { ...noteId, color: newColor } : noteId
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const updateLocalStorageText = (newText) => {
    const updatedNotes = JSON.parse(localStorage.getItem("notes")).map((n) =>
      n.id === note.id ? { ...n, text: newText } : n
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleTextChange = (newText) => {
    setText(newText);
    updateLocalStorageText(newText);
  };

  return (
    <Card
      className="sticky-note p-3 mb-3 me-3 border-1 d-inline-blobk position-relative h-100"
      style={{ backgroundColor: color }}
    >
      <TextareaAutosize
        minRows={5}
        placeholder="Enter your text here"
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        autoFocus
        className="notestextarea w-100 border-0 bg-transparent"
      />

      <div className="text-end">
        <label htmlFor={`colorid-${note.id}`}>
          <input
            id={`colorid-${note.id}`}
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="custom-color-input"
          />
          <ColorLensOutlinedIcon />
        </label>
        <DeleteOutlineIcon onClick={handleDelete} />
      </div>
    </Card>
  );
};

export default StickyNote;
