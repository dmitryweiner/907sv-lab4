import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import React from 'react';

test('Форма позволяет вводить данные, вызывает обработчик', () => {
  const value = '19';
  const handleSubmit = jest.fn();

  render(<Form handleSubmit={handleSubmit} />);

  const input = screen.getByTestId('input');
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
  expect(handleSubmit).not.toBeCalled();

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  expect(handleSubmit).toBeCalledWith(value);
});

test('Валидация', () => {
  const value = '';
  const handleSubmit = jest.fn();

  render(<Form handleSubmit={handleSubmit} />);

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
