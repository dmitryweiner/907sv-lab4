import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { ItemI } from '../../store/interfaces/itemInterface';
import { REMOVE, CHECKED } from '../../store/actions/todoAction';
import { testRender, makeTestStore } from '../../setupTests';
import Item from './Item';

const store = makeTestStore();

const item: ItemI = {
  id: '1',
  title: 'Hello, item',
  isChecked: false
};

test('Render Item', () => {
  const value = 'Hello, item';
  testRender(<Item item={item} />, { store });
  const element = screen.getByTestId('item');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(value);
});

test('delete item', () => {
  testRender(<Item item={item} />, { store });
  const button = screen.getByTestId('delete');
  expect(button).toBeInTheDocument();
  expect(store.dispatch).not.toBeCalled();
  fireEvent.click(button);
  expect(store.dispatch).toBeCalledWith({
    type: REMOVE,
    payload: item.id
  });
});

test('render checkbox', () => {
  testRender(<Item item={item} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
});

test('item checked', () => {
  testRender(<Item item={item} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(store.dispatch).not.toBeCalled();
  fireEvent.click(checkbox);
  expect(store.dispatch).toBeCalledWith({
    type: CHECKED,
    payload: item.id
  });
});

test('render edit button', () => {
  testRender(<Item item={item} />, { store });
  const editButton = screen.getByTestId('edit');
  expect(editButton).toBeInTheDocument();
});
