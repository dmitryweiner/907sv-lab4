import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../ListItem';
import React from 'react';
import { ACTION_TYPES, initialState } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';
import List from '../List';

const list = [
  {
    id: '123',
    title: 'TestItem1',
    checked: false
  },
  {
    id: '456',
    title: 'TestItem2',
    checked: true
  }
];

test('Displaying an item in the list, reacting to a button', () => {
  const store = makeTestStore({ initialState: { list } });
  testRender(<List />, { store });
  expect(screen.getByText('TestItem1')).toBeInTheDocument();

  // act
  for (let deleteButton of screen.getAllByTestId('deleteButton')) {
    fireEvent.click(deleteButton);
  }

  // asset
  expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.REMOVE, payload: list[0].id });
});

test('Displaying the selected checkbox', () => {
  const store = makeTestStore({ initialState: { list } });
  testRender(<ListItem id={list[0].id} title={list[0].title} checked={list[0].checked} />, {
    store
  });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toHaveAttribute('checked');
});

test('Displaying an empty checkbox', () => {
  const store = makeTestStore({ initialState: { list } });
  testRender(<ListItem id={list[0].id} title={list[0].title} checked={list[0].checked} />, {
    store
  });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toHaveAttribute('checked');
});

test('When you click on the checkbox, the desired method is called', () => {
  const store = makeTestStore({ initialState: { list } });
  testRender(<ListItem id={list[0].id} title={list[0].title} checked={list[0].checked} />, {
    store
  });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();

  expect(store.dispatch).not.toBeCalled();
  fireEvent.click(checkbox);
  expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECK, payload: list[0].id });
});

test('Displaying the edit field and the ability to save content', () => {
  const store = makeTestStore({ initialState: { list } });
  testRender(<ListItem id={list[0].id} title={list[0].title} checked={list[0].checked} />, {
    store
  });

  const editButton = screen.getByTestId('editButton');
  fireEvent.click(editButton);
  expect(editButton).not.toBeInTheDocument();
  expect(screen.queryByTestId('TestItem1')).toBeNull();

  const input = screen.getByTestId('editInput');
  expect(input.value).toEqual('TestItem1');
  fireEvent.input(input, { target: { value: 'TestItem1' } });

  const saveButton = screen.getByTestId('saveButton');
  fireEvent.click(saveButton);
  expect(input).not.toBeInTheDocument();
  expect(screen.queryByTestId('saveButton')).toBeNull();
  expect(screen.queryByTestId('editButton')).not.toBeNull();

  expect(store.dispatch).toBeCalledWith({
    type: ACTION_TYPES.EDIT,
    payload: { id: list[0].id, title: 'TestItem1' }
  });
});
