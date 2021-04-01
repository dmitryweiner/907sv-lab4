import React from 'react';
import './ListItem.css';
import { ACTION_TYPES, Action } from '../../store';

type ListItemProps = {
  title: string;
  id: string;
  isChecked: boolean;
  dispatch: (action: Action) => void;
};

export default function ListItem({ title, id, isChecked, dispatch }: ListItemProps) {
  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          data-testid="checkbox"
          onChange={() => dispatch({ type: ACTION_TYPES.CHECK, payload: id })}
        />
        <div className="task" data-testid="task">
          {title}
        </div>
        <button
          data-testid="delete-button"
          onClick={() => dispatch({ type: ACTION_TYPES.REMOVE, payload: id })}
        >
          X
        </button>
      </div>
    </>
  );
}
