import { screen, fireEvent } from '@testing-library/react';
import List from '../List';
import React from 'react';
import { ACTION_TYPES } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

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
  const store = makeTestStore();
  testRender(<List />, { store });
  expect(screen.getByText('Список пуст')).toBeInTheDocument();
});

test('Correct display of the list of elements', () => {
  const store = makeTestStore({ initialState: { list } });
  testRender(<List />, { store });

  for (let item of list) {
    expect(screen.getByText(item.title)).toBeInTheDocument();
  }

  for (let deleteButton of screen.getAllByTestId('deleteButton')) {
    fireEvent.click(deleteButton);
  }
  expect(store.dispatch).toBeCalledTimes(list.length);
});

test('Displaying checkboxes in the desired state', () => {
  const store = makeTestStore({ initialState: { list } });
  testRender(<List />, { store });

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    expect(checkboxes[i].checked).toEqual(list[i].isChecked);
  }
});

test('Calling the checkHandler with the required parameters when clicking on the checkbox', () => {
  const store = makeTestStore({ initialState: { list } });
  testRender(<List />, { store });

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes; i++) {
    fireEvent.click(checkboxes[i]);
    expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: list[i].id });
  }
});
