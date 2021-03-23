import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import { testRender, makeTestStore } from '../../setupTests';
import { ListI } from '../../store/interfaces/listInterface';

const initialState: ListI = {
  items: [
    {
      index: '1',
      value: 'Hello, im a unique element',
      isChecked: false
    }
  ],
  filter: 'All',
  search: ''
};

const store = makeTestStore({ initialState });

test('render Form', () => {
  testRender(<Form />, { store });
  const form = screen.getByTestId('form');
  expect(form).toBeInTheDocument();
});

test('enter text and submit', () => {
  const value = 'test';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: value } });
  expect(store.dispatch).not.toBeCalled();
  fireEvent.submit(form);
  expect(store.dispatch).toBeCalled();
});

test('validate error', () => {
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: '' } });
  fireEvent.submit(form);
  const error = screen.getByText(/Поле пустое, как твоя голова/i);
  expect(error).toBeInTheDocument();
});

test('check title unique', () => {
  const value = 'Hello, im a unique element';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: value } });
  fireEvent.submit(form);
  expect(store.dispatch).not.toBeCalled();
  const error = screen.getByText(/Запись уже есть/i);
  expect(error).toBeInTheDocument();
});
