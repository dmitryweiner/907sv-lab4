import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Filter from './Filter';
import { ACTION_TYPES, initialState, SELECTOR_TYPES } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

const store = makeTestStore({ initialState });

test('Отображает поле ввода, при вводе в которое осуществляется фильтрация по подстроке', () => {
  const field = 's';
  testRender(<Filter />, { store });
  const searchbar = screen.getByTestId('search-bar');
  expect(searchbar).toBeInTheDocument();
  expect(store.dispatch).not.toBeCalled();
  fireEvent.input(searchbar, { target: { value: field } });
  expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.SEARCH, payload: field });
});

test('Фильтр отображает варианты фильтрации', () => {
  testRender(<Filter />, { store });
  const options = [SELECTOR_TYPES.ALL, SELECTOR_TYPES.DONE, SELECTOR_TYPES.NOT_DONE];
  for (let i = 0; i < options.length; i++) {
    expect(screen.getByText(options[i])).toBeInTheDocument();
  }
});

test('При выборе варианта фильтрации вызывается dispatch с экшеном filter', () => {
  testRender(<Filter />, { store });
  const done = screen.getByText(SELECTOR_TYPES.DONE);
  expect(store.dispatch).not.toBeCalledWith({
    type: ACTION_TYPES.FILTER,
    payload: SELECTOR_TYPES.DONE
  });
  fireEvent.click(done);
  expect(store.dispatch).toBeCalledWith({
    type: ACTION_TYPES.FILTER,
    payload: SELECTOR_TYPES.DONE
  });
});
