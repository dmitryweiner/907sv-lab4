import React, { useEffect } from 'react';
import ListItem from './ListItem';
import { getItems, IItem, selectFilteredList } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';

type DecoupledListProps = {
  list: IItem[];
};

export function DecoupledList({ list }: DecoupledListProps) {
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

export default function List() {
  const dispatch = useDispatch();
  const list = useSelector(selectFilteredList);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <>
      <DecoupledList list={list} />
    </>
  );
}
