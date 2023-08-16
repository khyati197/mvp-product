import React from 'react';

const StickyNote = ({ note, onDelete }) => {
  const noteStyle = {
    backgroundColor: note.color,
  };

  return (
    <div className="sticky-note" style={noteStyle}>
      <span>{note.content}</span>
      <button className="delete-btn" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
};

export default StickyNote;
