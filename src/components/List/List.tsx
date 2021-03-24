import React from 'react';
import ListItem from '../ListItem/ListItem';
import { IAction, StateType, selectFilteredList } from '../../store';

type ListProps = { state: StateType; dispatch: (action: IAction) => void };

export default function List({ state, dispatch }: ListProps) {
  const list = selectFilteredList(state);
  if (list.length === 0) {
    return <div>Список пуст</div>;
  }
  return (
    <ul>
      {list.map(item => (
        <ListItem
          id={item.id}
          key={item.id}
          title={item.title}
          isChecked={item.isChecked}
          dispatch={dispatch}
        />
      ))}
    </ul>
  );
}
