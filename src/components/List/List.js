import React from 'react';
import ListItem from '../ListItem/ListItem';

function List({ list, dispatch }) {
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
            dispatch={dispatch}
          />
        ))}
      </ul>
    </div>
  );
}
export default List;
