import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import { testRender, makeTestStore } from '../../setupTests';
import { Store } from '../../store/reducers';
import { initialState as alertInitialState } from '../../store/reducers/alertReducer';
import { ADD } from '../../store/actions/alertAction';
import { selectOptions } from '../../store/reducers/todoReducer';

const initialState: Store = {
  todo: {
    items: [
      {
        index: 'index',
        value: 'Hello, im a unique element',
        isChecked: false
      }
    ],
    filter: selectOptions.All,
    search: ''
  },
  alert: alertInitialState
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
  expect(store.dispatch).toBeCalledWith(
    expect.objectContaining({
      type: ADD,
      payload: expect.objectContaining({
        message: 'Поле пустое, как твоя голова'
      })
    })
  );
});

test('check title unique', () => {
  const value = 'Hello, im a unique element';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: value } });
  fireEvent.submit(form);
  expect(store.dispatch).toBeCalledWith(
    expect.objectContaining({
      type: ADD,
      payload: expect.objectContaining({
        message: 'Поле уже существует'
      })
    })
  );
});
