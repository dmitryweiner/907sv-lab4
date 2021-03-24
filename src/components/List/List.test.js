import { render, screen, fireEvent } from '@testing-library/react';
import List from './List';
import React from 'react';
import { ACTION_TYPES } from '../../store';

const state = [
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
  const state = [];
  render(<List state={state} />);
  expect(screen.getByText('Список пуст')).toBeInTheDocument();
});

test('Корректное отображение списка элементов', () => {
  const dispatch = jest.fn();

  render(<List state={state} dispatch={dispatch} />);

  for (let item of state) {
    expect(screen.getByText(item.title)).toBeInTheDocument();
  }

  for (let deleteButton of screen.getAllByTestId('deleteButton')) {
    fireEvent.click(deleteButton);
  }
  expect(dispatch).toBeCalledTimes(state.length);
});

test('Отображение чекбоксов в нужном состоянии', () => {
  render(<List state={state} />);

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    expect(checkboxes[i].checked).toEqual(state[i].isChecked);
  }
});

test('Вызов checkHandler с нужными параметрами при клике на чекбокс', () => {
  const dispatch = jest.fn();

  render(<List state={state} dispatch={dispatch} />);

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes; i++) {
    fireEvent.click(checkboxes[i]);
    expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: state[i].id });
  }
});
