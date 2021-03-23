import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';
import { ACTION_TYPES } from '../../store';

const dispatch = jest.fn();

test('Отображается поле для ввода и кнопка "Добавить"', () => {
  render(<Form dispatch={dispatch} />);
  const input = screen.getByTestId('input');
  const button = screen.getByTestId('button');
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('Можно ввести что-то в поле для ввода и при нажатии вызывается dispatch с параметром, равным тому, что ввели в поле для ввода', () => {
  const field = 'Some text';
  render(<Form dispatch={dispatch} />);
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: field } });
  expect(dispatch).not.toBeCalled();
  fireEvent.submit(form);
  expect(dispatch).toBeCalledWith({ payload: field, type: ACTION_TYPES.ADD });
});

test('При пустом поле ввода dispatch не вызывается, пока что-то не будет введено', () => {
  const field = '';
  render(<Form dispatch={dispatch} />);
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: field } });
  fireEvent.submit(form);
  expect(dispatch).not.toBeCalledWith({ payload: field, type: ACTION_TYPES.ADD });
});
