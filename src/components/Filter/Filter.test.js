import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';
import { ACTION_TYPES, initialState } from '../../store';

const dispatch = jest.fn();

test('Отображается чекбокс Показывать только выполненные и после нажатия на него вызывается dispatch с типом экшена filter', () => {
  render(<Filter dispatch={dispatch} state={initialState} />);
  const filter = screen.getByTestId('filter');
  expect(filter).toBeInTheDocument();
  expect(dispatch).not.toBeCalledWith({ type: ACTION_TYPES.FILTER });
  fireEvent.click(filter);
  expect(dispatch).toBeCalledWith({ type: ACTION_TYPES.FILTER });
});
