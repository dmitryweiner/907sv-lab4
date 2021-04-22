import { render, screen, fireEvent } from '@testing-library/react';
import List from '../List';
import React from 'react';
import { ACTION_TYPES } from '../../store';

const list = [
  {
    id: '123',
    title: 'TestItem1',
    isChecked: false
  },
  {
    id: '456',
    title: 'TestItem2',
    isChecked: true
  }
];

test('Correct display of an empty list', () => {
  const list = [];
  render(<List list={list} />);
  expect(screen.getByText('Список пуст')).toBeInTheDocument();
});

test('Correct display of the list of elements', () => {
  const dispatch = jest.fn();

  render(<List list={list} dispatch={dispatch} />);

  for (let item of list) {
    expect(screen.getByText(item.title)).toBeInTheDocument();
  }

  for (let deleteButton of screen.getAllByTestId('deleteButton')) {
    fireEvent.click(deleteButton);
  }
  expect(dispatch).toBeCalledTimes(list.length);
});

test('Displaying checkboxes in the desired state', () => {
  render(<List list={list} />);

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    expect(checkboxes[i].checked).toEqual(list[i].isChecked);
  }
});

test('Calling the checkHandler with the required parameters when clicking on the checkbox', () => {
  const dispatch = jest.fn();

  render(<List list={list} dispatch={dispatch} />);

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes; i++) {
    fireEvent.click(checkboxes[i]);
    expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: list[i].id });
  }
});
