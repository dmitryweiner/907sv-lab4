import React, { useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import { ACTION_TYPES, selectFilteredList } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function List() {
  const list = useSelector(selectFilteredList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3001/todos';
      const response = await fetch(url);
      const list = await response.json();
      console.log(list);

      dispatch({
        type: ACTION_TYPES.ADD_ALL,
        payload: list
      });
    };
    fetchData();
  }, []);

  if (list.length === 0) {
    return <div>Список пуст</div>;
  }
  return (
    <ul>
      {list.map(item => (
        <ListItem id={item.id} key={item.id} title={item.title} isChecked={item.isChecked} />
      ))}
    </ul>
  );
}
