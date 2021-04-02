import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import List from './List';
import { SELECTOR_TYPES, remove, check } from '../../store';
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

test('Компонент выводит каждый элемент списка', () => {
  const store = makeTestStore({ initialState });
  testRender(<List />, { store });
  const elements = screen.getAllByTestId('task');
  expect(elements).toHaveLength(list.length);
  for (let i = 0; i < list.length; i++) {
    expect(elements[i]).toHaveTextContent(list[i].title);
  }
});

test('Кнопка в каждом элементе нажимается, при этом вызывается store.dispatch с параметром id', () => {
  const store = makeTestStore({ initialState });
  testRender(<List />, { store });
  const buttons = screen.getAllByTestId('delete-button');
  for (let i = 0; i < list.length; i++) {
    expect(buttons[i]).toBeInTheDocument();
    expect(store.dispatch).not.toBeCalledWith(remove(list[i].id));
    fireEvent.click(buttons[i]);
    expect(store.dispatch).toBeCalledWith(remove(list[i].id));
  }
});

test('При отображении пустого списка выводится надпись "Нет дел в списке"', () => {
  initialState.list = [];
  const store = makeTestStore({ initialState });
  testRender(<List />, { store });
  const element = screen.getByTestId('list');
  expect(element).toHaveTextContent('Нет дел в списке');
});

test('Чекбокс в каждом элементе прокликивается, при этом вызывается store.dispatch с параметром id', () => {
  initialState.list = list;
  const store = makeTestStore({ initialState });
  testRender(<List />, { store });
  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < list.length; i++) {
    expect(checkboxes[i]).toBeInTheDocument();
    expect(store.dispatch).not.toBeCalledWith(check(list[i].id));
    fireEvent.click(checkboxes[i]);
    expect(store.dispatch).toBeCalledWith(check(list[i].id));
  }
});
