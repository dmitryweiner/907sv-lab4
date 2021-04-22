import React from 'react';

export default function ListItem({ id, title, isChecked, deleteHandler, checkedHandler }) {
  return (
    <li>
      <input
        type="checkbox"
        data-testid="checkbox"
        checked={isChecked}
        onChange={e => checkedHandler(id, e.target.checked)}
      />
      {title}
      <button className="deleteBtn" data-testid="deleteButton" onClick={() => deleteHandler(id)}>
        x
      </button>
    </li>
  );
}
