import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Note({ text, color, onDelete, _id, onEdit }) {
  return (
    <div className={`note ${color}`} key={_id}>
      <div className="note-text">{text}</div>
      {/* <span className="note-delete" onClick={onDelete}>
        &times; 
      </span> */}
      <span className='note-delete'>
        <FaEdit className="edit-icon icon" onClick={onEdit} />
        <FaTrash className="delete-icon icon" onClick={onDelete} />
      </span>
    </div>
  );
}

export default Note;
