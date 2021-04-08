import React, { useEffect } from 'react';
import Item from '../Item/Item';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectFilteredList } from '../../selectors/getSelectFilteredList';
import { ItemI } from '../../store/interfaces/itemInterface';
import { addAllTodos } from '../../store/actions/todoAction';

function List() {
  const list: ItemI[] = useSelector(getSelectFilteredList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addAllTodos());
  }, []);

  return (
    <>
      <div data-testid="list">
        {list.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

export default List;
