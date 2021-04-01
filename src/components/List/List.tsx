import React from 'react';
import ListItem from '../ListItem/ListItem';
import { Action, Item } from '../../store';

type ListProps = {
  list: Item[];
  dispatch: (action: Action) => void;
};

export default function List({ list, dispatch }: ListProps) {
  function renderList() {
    if (!list.length) {
      return 'Нет дел в списке';
    }
    return (
      <>
        {list.map(item => (
          <ListItem
            key={item.id}
            title={item.title}
            id={item.id}
            isChecked={item.isChecked}
            dispatch={dispatch}
          />
        ))}
      </>
    );
  }
  return <div data-testid="list">{renderList()}</div>;
}
