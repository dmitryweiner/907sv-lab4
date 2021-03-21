import React from 'react';
import Item from '../Item/Item';
import { useSelector } from 'react-redux';
import { filterList } from '../../store/store';

function List() {
  const list = useSelector(filterList);
  return (
    <>
      <div data-testid="list">
        {list.map(item => (
          <Item item={item} key={item.index} />
        ))}
      </div>
    </>
  );
}

export default List;
