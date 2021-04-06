import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Form from './Form';
import { SELECTOR_TYPES, add } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

const initialState = {
  list: [
    {
      id: '0',
      title: 'Вымыть пол',
      isChecked: false
    }
  ],
  filtered: SELECTOR_TYPES.ALL,
  searchBar: ''
};

const store = makeTestStore({ initialState });

test('Отображается поле для ввода и кнопка "Добавить"', () => {
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const button = screen.getByTestId('button');
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('Можно ввести что-то в поле для ввода и при нажатии вызывается store.dispatch с параметром, равным тому, что ввели в поле для ввода', () => {
  const field = 'Some text';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: field } });
  expect(store.dispatch).not.toBeCalled();
  fireEvent.submit(form);
  expect(store.dispatch).toBeCalledWith(add(field));
});

test('При пустом поле ввода store.dispatch не вызывается, пока что-то не будет введено', () => {
  const field = '';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: field } });
  fireEvent.submit(form);
  expect(store.dispatch).not.toBeCalledWith(add(field));
});

test('Невозможно создать элемент с уже существующим title', () => {
  const field = 'Вымыть пол';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: field } });
  fireEvent.submit(form);
  expect(store.dispatch).not.toBeCalledWith(add(field));
});
