import React, { useState } from 'react';
import { ACTION_TYPES } from '../store';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

export default function ListItem({ id, title, isChecked, dispatch }) {
  const [editMode, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState(title);

  function saveHandler() {
    setEditMode(false);
    dispatch({
      type: ACTION_TYPES.EDIT,
      payload: { id, title: editInput }
    });
  }

  return (
    <li>
      <Checkbox
        data-testid="checkbox"
        checked={isChecked}
        onChange={() =>
          dispatch({
            type: ACTION_TYPES.CHECKED,
            payload: id
          })
        }
      />
      {!editMode && (
        <>
          <span data-testid="title">{title}&nbsp;&nbsp;</span>
        </>
      )}
      {!editMode && (
        <Fab
          size="small"
          color="primary"
          aria-label="edit"
          data-testid="editButton"
          onClick={() => setEditMode(true)}
        >
          <EditIcon />
        </Fab>
      )}
      {editMode && (
        <>
          <TextField
            value={editInput}
            data-testid="editInput"
            onChange={e => setEditInput(e.target.value)}
          />
          <Fab
            size="small"
            color="primary"
            className="saveBtn"
            data-testid="saveButton"
            onClick={saveHandler}
          >
            <SaveIcon />
          </Fab>
        </>
      )}
      <Fab
        size="small"
        color="secondary"
        className="deleteBtn"
        data-testid="deleteButton"
        onClick={() =>
          dispatch({
            type: ACTION_TYPES.REMOVE,
            payload: id
          })
        }
      >
        <DeleteIcon />
      </Fab>
    </li>
  );
}
