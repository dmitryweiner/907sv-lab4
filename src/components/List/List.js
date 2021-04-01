import React from 'react';
import ListItem from '../ListItem/ListItem';

function List({ list, deleteHandler, checkHandler, moveUpHandler, moveDownHandler }) {
  if (list.length === 0) {
    return <div className="emptyList">There are no elements yet (￣︿￣)</div>;
  }
  return (
    <div className="listWrapper">
      <ul>
        {list.map(item => (
          <ListItem
            id={item.id}
            key={item.id}
            isChecked={item.isChecked}
            title={item.title}
            deleteHandler={deleteHandler}
            checkHandler={checkHandler}
            moveUpHandler={moveUpHandler}
            moveDownHandler={moveDownHandler}
          />
        ))}
      </ul>
    </div>
  );
}
export default List;
