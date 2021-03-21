import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import { ADD } from '../../store/types';
import { testRender, makeTestStore } from '../../setupTests';

const store = makeTestStore();

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
  expect(store.dispatch).toBeCalledWith({
    type: ADD,
    payload: value
  });
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
