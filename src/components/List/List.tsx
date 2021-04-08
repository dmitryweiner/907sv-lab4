import React, { useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import { getItems, selectFilteredList } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function List() {
  const dispatch = useDispatch();
  const list = useSelector(selectFilteredList);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  if (list.length === 0) {
    return <div>Список пуст</div>;
  }

  return (
    <>
      <ul>
        {list.map(item => (
          <ListItem id={item.id} key={item.id} title={item.title} isChecked={item.isChecked} />
        ))}
      </ul>
    </>
  );
}
