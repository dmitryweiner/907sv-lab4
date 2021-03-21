import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { ItemI } from '../../store/interfaces/itemInterface';
import { REMOVE, CHECKED } from '../../store/types';
import { testRender, makeTestStore } from '../../setupTests';
import Item from './Item';

const store = makeTestStore();

const item: ItemI = {
  index: '1',
  value: 'Hello, item',
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
    payload: item.index
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
    payload: item.index
  });
});

test('render edit button', () => {
  testRender(<Item item={item} />, { store });
  const editButton = screen.getByTestId('edit');
  expect(editButton).toBeInTheDocument();
});
