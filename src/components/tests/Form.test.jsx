import { screen, fireEvent } from '@testing-library/react';
import Form from '../Form.jsx';
import React from 'react';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES } from '../../store';

test('Форма позволяет вводить данные, вызывает обработчик', () => {
  const value = '19';
  const handleSubmit = jest.fn();
  const store = makeTestStore();
  testRender(<Form handleSubmit={handleSubmit} />, { store });

  const input = screen.getByTestId('input');
  fireEvent.input(input, {
    target: {
      value
    }
  });
  const action = {
    type: ACTION_TYPES.ADD,
    payload: value
  }
  expect(handleSubmit).not.toBeCalled();

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  expect(store.dispatch).toBeCalledWith(action);
});

test('Валидация', () => {
  const value = '';
  const handleSubmit = jest.fn();

  const store = makeTestStore();
  testRender(<Form />, { store });

  const input = screen.getByTestId('input');
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
  expect(handleSubmit).not.toBeCalled();

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  expect(handleSubmit).not.toBeCalled();
  expect(screen.getByText('Введите текст, пожалуйста')).toBeInTheDocument();
});
