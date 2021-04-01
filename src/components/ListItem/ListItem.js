import React from 'react';

function ListItem({
  title,
  id,
  isChecked,
  deleteHandler,
  checkHandler,
  moveUpHandler,
  moveDownHandler
}) {
  return (
    <div className="listItem">
      <div className="listItemInformation">
        <input
          type="checkbox"
          data-testid="checkbox"
          checked={isChecked}
          onChange={e => checkHandler(id, e.target.checked)}
        />
        {title}
      </div>
      <div className="listItemButtons">
        <div className="moveButtons">
          <button id="moveUpButton" data-testid="moveUpButton" onClick={() => moveUpHandler(id)}>
            ^
          </button>
          <button
            id="moveDownButton"
            data-testid="moveDownButton"
            onClick={() => moveDownHandler(id)}
          >
            ˅
          </button>
        </div>
        <button id="delete-button" data-testid="delete-button" onClick={() => deleteHandler(id)}>
          ✗
        </button>
      </div>
    </div>
  );
}
export default ListItem;
