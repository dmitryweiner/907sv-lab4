import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';
import { ACTION_TYPES, initialState } from '../../store';

const dispatch = jest.fn();

test('Отображает поле ввода, при вводе в которое осуществляется фильтрация по подстроке', () => {
  const field = 's';
  render(<Filter dispatch={dispatch} state={initialState} />);
  const searchbar = screen.getByTestId('search-bar');
  expect(searchbar).toBeInTheDocument();
  expect(dispatch).not.toBeCalledWith({
    type: ACTION_TYPES.SEARCH,
    payload: ''
  });
  fireEvent.input(searchbar, { target: { value: field } });
  expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.SEARCH, payload: field });
});
