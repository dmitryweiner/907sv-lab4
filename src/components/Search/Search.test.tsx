import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Search from './Search';
import { SEARCH } from '../../store/types';
import { makeTestStore, testRender } from '../../setupTests';

const store = makeTestStore();

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
