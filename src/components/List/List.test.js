import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import List from './List';
import { ACTION_TYPES, SELECTOR_TYPES } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

const list = [
  {
    id: 0,
    title: 'Помыть посуду',
    isChecked: false
  },
  {
    id: 1,
    title: 'Полить цветы',
    isChecked: false
  },
  {
    id: 2,
    title: 'Сходить в магазин',
    isChecked: false
  },
  {
    id: 3,
    title: 'Помыть полы',
    isChecked: false
  }
];

const initialState = {
  list: list,
  filtered: SELECTOR_TYPES.ALL,
  searchBar: ''
};

const store = makeTestStore({ initialState });

test('Компонент выводит каждый элемент списка', () => {
  testRender(<List />, { store });
  const elements = screen.getAllByTestId('task');
  expect(elements).toHaveLength(list.length);
  for (let i = 0; i < list.length; i++) {
    expect(elements[i]).toHaveTextContent(list[i].title);
  }
});

test('Кнопка в каждом элементе нажимается, при этом вызывается dispatch с параметром id', () => {
  testRender(<List />, { store });
  const buttons = screen.getAllByTestId('delete-button');
  for (let i = 0; i < list.length; i++) {
    expect(buttons[i]).toBeInTheDocument();
    expect(store.dispatch).not.toBeCalledWith({ payload: list[i].id, type: ACTION_TYPES.REMOVE });
    fireEvent.click(buttons[i]);
    expect(store.dispatch).toBeCalledWith({ payload: list[i].id, type: ACTION_TYPES.REMOVE });
  }
});

test('При отображении пустого списка выводится надпись "В списке нет элементов"', () => {
  testRender(<List />, { store });
  const element = screen.getByTestId('list');
  expect(element).toHaveTextContent('Нет дел в списке');
});

test('Чекбокс в каждом элементе прокликивается, при этом вызывается dispatch с параметром id', () => {
  testRender(<List />, { store });
  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < list.length; i++) {
    expect(checkboxes[i]).toBeInTheDocument();
    expect(store.dispatch).not.toBeCalledWith({ payload: list[i].id, type: ACTION_TYPES.CHECK });
    fireEvent.click(checkboxes[i]);
    expect(store.dispatch).toBeCalledWith({ payload: list[i].id, type: ACTION_TYPES.CHECK });
  }
});
