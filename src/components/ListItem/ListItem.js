import React from 'react';
import { ACTION_TYPES } from '../Store';

function ListItem({ title, id, isChecked, dispatch }) {
  return (
    <div className="listItem">
      <div className="listItemInformation">
        <input
          type="checkbox"
          data-testid="checkbox"
          checked={isChecked}
          onChange={() => dispatch({ type: ACTION_TYPES.CHECK, payload: id })}
        />
        {title}
      </div>
      <div className="listItemButtons">
        <div className="moveButtons">
          <button
            id="moveUpButton"
            data-testid="moveUpButton"
            onClick={() => dispatch({ type: ACTION_TYPES.MOVE_UP, payload: id })}
          >
            ^
          </button>
          <button
            id="moveDownButton"
            data-testid="moveDownButton"
            onClick={() => dispatch({ type: ACTION_TYPES.MOVE_DOWN, payload: id })}
          >
            ˅
          </button>
        </div>
        <button
          id="delete-button"
          data-testid="delete-button"
          onClick={() => dispatch({ type: ACTION_TYPES.DELETE, payload: id })}
        >
          ✗
        </button>
      </div>
    </div>
  );
}
export default ListItem;
