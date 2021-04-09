import React, { useState } from 'react';
import { ACTION_TYPES, removeItem } from '../../store';
import { useDispatch } from 'react-redux';

type ListItemProps = {
  id: string;
  title: string;
  isChecked: boolean;
};

export default function ListItem({ id, title, isChecked }: ListItemProps) {
  const dispatch = useDispatch();
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
      <input
        type="checkbox"
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
          <span data-testid="title">{title}</span>
          <button className="editBtn" data-testid="editButton" onClick={() => setEditMode(true)}>
            &#128397;
          </button>
        </>
      )}
      {editMode && (
        <>
          <input
            value={editInput}
            data-testid="editInput"
            onChange={e => setEditInput(e.target.value)}
          />
          <button className="saveBtn" data-testid="saveButton" onClick={saveHandler}>
            &#10004;
          </button>
        </>
      )}
      <button
        className="deleteBtn"
        data-testid="deleteButton"
        onClick={() => dispatch(removeItem(id))}
      >
        &#10006;
      </button>
    </li>
  );
}
