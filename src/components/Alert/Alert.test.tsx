import { makeTestStore, testRender } from '../../setupTests';
import Alert from '../Alert/Alert';
import { screen } from '@testing-library/react';
import React from 'react';
import { Store } from '../../store/reducers';
import { initialState as todoInitialState } from '../../store/reducers/todoReducer';

const initialState: Store = {
  todo: todoInitialState,
  alert: {
    messages: [
      {
        id: 'test',
        message: 'error'
      },
      {
        id: 'test1',
        message: 'error'
      }
    ],
    delay: 3000
  },
  auth: {
    isAuth: true
  }
};

const store = makeTestStore({ initialState });

test('render alert', () => {
  testRender(<Alert />, { store });
  const alert = screen.getByTestId('alert');
  expect(alert).toBeInTheDocument();
});

test('number errors', () => {
  testRender(<Alert />, { store });
  const errors = screen.getAllByTestId('alert-message');
  expect(errors.length).not.toEqual(1);
  expect(errors.length).toEqual(2);
});
