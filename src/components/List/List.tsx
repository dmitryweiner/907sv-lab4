import React from 'react';
import ListItem from '../ListItem/ListItem';
import { getFilteredList } from '../Store';
import { useSelector } from 'react-redux';

function List() {
  const list = useSelector(getFilteredList);

  if (list.length === 0) {
    return <div className="emptyList">There are no elements yet (￣︿￣)</div>;
  }

  return (
    <div className="listWrapper">
      <ul>
        {list.map(item => (
          <ListItem item={item} key={item.id}/>
        ))}
      </ul>
    </div>
  );
}
export default List;
