import React from 'react';
import { ACTION_TYPES } from '../Store';
import { useDispatch } from 'react-redux';

type ItemProps = {
  item:{
    title: string;
    id: string;
    isChecked: boolean;
  }
};

function ListItem({ item }: ItemProps) {
  const dispatch = useDispatch();
  function itemCheck() {
    dispatch({
      type: ACTION_TYPES.CHECK,
      payload: item.id
    });
  }
  function itemMoveUp() {
    dispatch({
      type: ACTION_TYPES.MOVE_UP,
      payload: item.id
    });
  }
  function itemMoveDown() {
    dispatch({
      type: ACTION_TYPES.MOVE_DOWN,
      payload: item.id
    });
  }
  function itemDelete() {
    dispatch({
      type: ACTION_TYPES.DELETE,
      payload: item.id
    });
  }

  return (
    <div className="listItem">
      <div className="listItemInformation">
        <input type="checkbox" data-testid="checkbox" checked={item.isChecked} onChange={itemCheck} />
        {item.title}
      </div>
      <div className="listItemButtons">
        <div className="moveButtons">
          <button id="moveUpButton" data-testid="moveUpButton" onClick={itemMoveUp}>
            ^
          </button>
          <button id="moveDownButton" data-testid="moveDownButton" onClick={itemMoveDown}>
            ˅
          </button>
        </div>
        <button id="delete-button" data-testid="delete-button" onClick={itemDelete}>
          ✗
        </button>
      </div>
    </div>
  );
}
export default ListItem;
