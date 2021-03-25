import { screen, fireEvent } from '@testing-library/react';
import List from './List';
import React from 'react';
import { ACTION_TYPES } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

const list = [
  {
    id: '1',
    title: 'Полить кота',
    isChecked: false
  },
  {
    id: '2',
    title: 'Покормить цветы',
    isChecked: true
  }
];

test('Корректное отображение пустого списка', () => {
  const list = [];
  const store = makeTestStore({ initialState: { list } });
  testRender(<List />, { store });
  expect(screen.getByText('Список пуст')).toBeInTheDocument();
});

test('Корректное отображение списка элементов', () => {
  const store = makeTestStore({ initialState: { list, substring: '' } });
  testRender(<List />, { store });

  for (let item of list) {
    expect(screen.getByText(item.title)).toBeInTheDocument();
  }

  for (let deleteButton of screen.getAllByTestId('deleteButton')) {
    fireEvent.click(deleteButton);
  }
  expect(store.dispatch).toBeCalledTimes(list.length);
});

test('Отображение чекбоксов в нужном состоянии', () => {
  const store = makeTestStore({ initialState: { list, substring: '' } });
  testRender(<List />, { store });

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    expect(checkboxes[i].checked).toEqual(list[i].isChecked);
  }
});

test('Вызов checkHandler с нужными параметрами при клике на чекбокс', () => {
  const store = makeTestStore({ initialState: { list, substring: '' } });
  testRender(<List />, { store });

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes; i++) {
    fireEvent.click(checkboxes[i]);
    expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: list[i].id });
  }
});
