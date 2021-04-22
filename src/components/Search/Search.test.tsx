import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Search from './Search';
import { SEARCH } from '../../store/actions/todoAction';
import { makeTestStore, testRender } from '../../setupTests';
import { Store } from '../../store/reducers';
import { initialState as todoInitialState } from '../../store/reducers/todoReducer';
import { initialState as alertInitialState } from '../../store/reducers/alertReducer';

const initialState: Store = {
  todo: todoInitialState,
  alert: alertInitialState,
  auth: {
    isAuth: true
  }
};

const store = makeTestStore({ initialState });

test('render search component', () => {
  testRender(<Search />, { store });
  expect(screen.getByTestId('search')).toBeInTheDocument();
});

test('search', () => {
  const value = 'test';
  testRender(<Search />, { store });
  const search = screen.getByTestId('search');
  fireEvent.input(search, { target: { value: value } });
  expect(store.dispatch).toBeCalledWith({
    type: SEARCH,
    payload: value
  });
});
