import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Note from './components/Note';
const API_URL = 'http://localhost:5000';
function App() {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [color, setColor] = useState('none');
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteID, setEditingNoteID] = useState('');

  const addNote = async() => {
    if (noteText.trim() !== '') {
      try {
        const response = await axios.post(`${API_URL}/create`, {
          text: noteText,
          color: color,
        });
        console.log(response.data.data);  
        setNotes([...notes, response.data.data]);
        setNoteText('');
        setColor('none');
      } catch (error) {
        console.error('Failed to add note', error);
      }
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response= await axios.delete(`${API_URL}/delete/${noteId}`);
      console.log(response.data);
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  };

  const startEdit= (noteId, text, color)=> {
    setColor(color);
    setNoteText(text);
    setIsEditing(true);
    setEditingNoteID(noteId);
  }

  const updateNote = async () => {
    try {
      const updatedNote = { text: noteText, color: color };
      const response = await axios.put(`${API_URL}/update/${editingNoteID}`, updatedNote);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
    
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note._id === editingNoteID) {
          return { ...note, note: noteText, color: color };
        } else {
          return note;
        }
      });
    });
    setIsEditing(false);
    setNoteText('');
    setColor('none');
    setEditingNoteID('');
  };
  
  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_URL}/notes`);
        console.log(response.data.notes);
        setNotes(prev=> response.data.notes);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <header>
        <h1>Simple Note Taking App</h1>
        <p>Create and Delete notes, with optional color tagging</p>
      </header>
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          cols="80"
          rows="10"
          placeholder="Start typing a note..."
        />
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="none">Select color</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
        </select>
        <button type="button" onClick={isEditing? updateNote: addNote} id='addNoteBtn'>Add note</button>
      </form>
      <div id="notes">
        {notes.map((note) => (
          <Note
            key={note._id}
            text={note.note}
            color={note.color}
            onDelete={() => deleteNote(note._id)}
            onEdit={()=> startEdit(note._id, note.note, note.color)}
          />
        ))}
        {/* {notes.map((note) => (
          <div key={note._id} className={`note ${note.color}`}>
            <div className="note-text">{note.text}</div>
            <span
              className="note-delete"
              onClick={() => deleteNote(note._id)}
            >
              &times;
            </span>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default App;
