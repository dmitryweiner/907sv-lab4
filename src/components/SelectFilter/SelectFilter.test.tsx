import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import SelectFilter from './SelectFilter';
import { FILTER } from '../../store/actions/todoAction';
import { testRender, makeTestStore } from '../../setupTests';

const store = makeTestStore({ initialState: { items: [], filter: 'All', search: '' } });

test('render SelectFilter', () => {
  testRender(<SelectFilter />, { store });
  expect(screen.getByTestId('select')).toBeInTheDocument();
});

test('click select options', () => {
  testRender(<SelectFilter />, { store });
  const select = screen.getByTestId('select');

  fireEvent.change(select, { target: { value: 'All' } });
  expect(store.dispatch).toBeCalledWith({
    type: FILTER,
    payload: 'All'
  });

  fireEvent.change(select, { target: { value: 'Completed' } });
  expect(store.dispatch).toBeCalledWith({
    type: FILTER,
    payload: 'Completed'
  });

  fireEvent.change(select, { target: { value: 'NotCompleted' } });
  expect(store.dispatch).toBeCalledWith({
    type: FILTER,
    payload: 'NotCompleted'
  });
});
