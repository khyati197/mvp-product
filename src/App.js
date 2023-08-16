import { useState } from "react";
import "./App.css";
import MVP from "./components/MvpData";
import StickyNote from "./components/Notes";
import ColorPicker from "./components/ColorPicker";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#FFFF00'); // Default color

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: '',
      color: selectedColor,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNoteContent = (id, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
  };
  return (
    <>
      <div className="row mx-0">
        <div className="col-lg-6">
          <MVP />
        </div>
        <div className="col-lg-6">
        <div className="app">
      <h1>Sticky Notes App</h1>
      <ColorPicker
        colors={['rgb(255 255 0 / 30%)', 'rgb(3 169 244 / 52%)', 'rgb(139 195 74 / 70%)']}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />
      <button className="add-note-btn" onClick={addNote}>
        Add Note
      </button>
      <div className="sticky-notes">
        {notes.map((note) => (
          <StickyNote key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
        </div>
      </div>
    </>
  );
}

export default App;
