import React from 'react';
import Item from '../Item/Item';
import { useSelector } from 'react-redux';
import { getSelectFilteredList } from '../../selectors/getSelectFilteredList';
import { ItemI } from '../../store/interfaces/itemInterface';

function List() {
  const list: ItemI[] = useSelector(getSelectFilteredList);
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
