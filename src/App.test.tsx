import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { testRender, makeTestStore } from './setupTests';
import { Store } from './store/reducers';
import { initialState as todoInitialState } from './store/reducers/todoReducer';
import { initialState as alertInitialState } from './store/reducers/alertReducer';

const initialState: Store = {
  todo: todoInitialState,
  alert: alertInitialState,
  auth: {
    isAuth: true
  }
};

const store = makeTestStore({ initialState });

test('render App', () => {
  testRender(<App />, { store });
  const text = screen.getByText('Лабораторная №4 по теме Redux');
  expect(text).toBeInTheDocument();
});
