import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Form from './Form';
import { testRender } from '../../setupTests';
import { Store } from '../../store/reducers';
import { initialState as alertInitialState } from '../../store/reducers/alertReducer';
import { selectOptions } from '../../store/reducers/todoReducer';
import { REQUEST_STATUS } from '../../api/Api';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { SET_REQUEST_STATUS } from '../../store/actions/todoAction';

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const initialState: Store = {
  todo: {
    items: [
      {
        id: 'index',
        title: 'Hello, im a unique element',
        isChecked: false
      }
    ],
    filter: selectOptions.All,
    search: '',
    requestStatus: REQUEST_STATUS.IDLE
  },
  alert: alertInitialState,
  auth: {
    isAuth: true
  }
};

afterEach(() => fetchMock.reset());

test('render Form', () => {
  const store = mockStore(initialState);
  testRender(<Form />, { store });
  const form = screen.getByTestId('form');
  expect(form).toBeInTheDocument();
});

test('enter text and submit', () => {
  const store = mockStore(initialState);
  const value = 'test';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: value } });
  fireEvent.submit(form);
  expect(store.getActions()[0]).toEqual({
    type: SET_REQUEST_STATUS,
    payload: REQUEST_STATUS.LOADING
  });
});
