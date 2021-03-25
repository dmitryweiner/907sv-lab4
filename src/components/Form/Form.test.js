import { screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import React from 'react';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES } from '../../store';

const store = makeTestStore();

test('Форма позволяет вводить данные, вызывает обработчик', () => {
  const value = '19';

  testRender(<Form />, { store });

  const input = screen.getByTestId('input');
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
  expect(store.dispatch).not.toBeCalled();

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.ADD, payload: value });
});

test('Валидация', () => {
  const value = '';

  testRender(<Form />, { store });

  const input = screen.getByTestId('input');
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
  expect(store.dispatch).not.toBeCalled();

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  expect(store.dispatch).not.toBeCalled();
  expect(screen.getByText('Введите текст, пожалуйста')).toBeInTheDocument();
});

test('Проверка на уникальность', () => {
  const list = [
    {
      id: '1',
      title: 'Еда',
      isChecked: false
    }
  ];

  const store = makeTestStore({ initialState: { list } });

  testRender(<Form />, { store });

  const input = screen.getByTestId('input');
  fireEvent.input(input, {
    target: {
      value: list[0].title
    }
  });
  expect(store.dispatch).not.toBeCalled();

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  expect(store.dispatch).not.toBeCalled();
  expect(screen.getByText('Задача уже имеется')).toBeInTheDocument();
});
