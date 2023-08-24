import React, { useState } from "react";
import { Card, TextareaAutosize, Tooltip } from "@mui/material";
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

  // Calculate the luminance of the background color
  const getColor = (hexColor) => {
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const isDarkColor = getColor(color) < 0.5;

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
        style={{ color: isDarkColor ? "white" : "black" }}
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
          <Tooltip title="Color">
            <ColorLensOutlinedIcon
              style={{ color: isDarkColor ? "white" : "black" }}
            />
          </Tooltip>
        </label>
        <Tooltip title="Delete">
          <DeleteOutlineIcon
            onClick={handleDelete}
            style={{ color: isDarkColor ? "white" : "black" }}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export default StickyNote;
