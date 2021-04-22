import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { ItemI } from '../../store/interfaces/itemInterface';
import { SET_REQUEST_STATUS } from '../../store/actions/todoAction';
import { testRender, makeTestStore } from '../../setupTests';
import Item from './Item';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { selectOptions } from '../../store/reducers/todoReducer';
import { REQUEST_STATUS } from '../../api/Api';
import { initialState as alertInitialState } from '../../store/reducers/alertReducer';
import fetchMock from 'fetch-mock';

const store = makeTestStore();

const item: ItemI = {
  id: '1',
  title: 'Hello, item',
  isChecked: false
};

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {
  todo: {
    items: [
      {
        id: '1',
        title: 'title',
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

test('Render Item', () => {
  const value = 'Hello, item';
  testRender(<Item item={item} />, { store });
  const element = screen.getByTestId('item');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(value);
});

test('delete item', () => {
  const store = mockStore(initialState);
  testRender(<Item item={item} />, { store });
  const button = screen.getByTestId('delete');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(store.getActions()[0]).toEqual({
    type: SET_REQUEST_STATUS,
    payload: REQUEST_STATUS.LOADING
  });
});

test('render checkbox', () => {
  testRender(<Item item={item} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
});

test('item checked', () => {
  const store = mockStore(initialState);
  testRender(<Item item={item} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  fireEvent.click(checkbox);
  expect(store.getActions()[0]).toEqual({
    type: SET_REQUEST_STATUS,
    payload: REQUEST_STATUS.LOADING
  });
});

test('render edit button', () => {
  testRender(<Item item={item} />, { store });
  const editButton = screen.getByTestId('edit');
  expect(editButton).toBeInTheDocument();
});
