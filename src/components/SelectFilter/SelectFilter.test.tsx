import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import SelectFilter from './SelectFilter';
import { FILTER } from '../../store/actions/todoAction';
import { testRender, makeTestStore } from '../../setupTests';
import { selectOptions } from '../../store/reducers/todoReducer';

const store = makeTestStore({ initialState: { items: [], filter: 'All', search: '' } });

test('render SelectFilter', () => {
  testRender(<SelectFilter />, { store });
  expect(screen.getByTestId('select')).toBeInTheDocument();
});

test('click select options', () => {
  testRender(<SelectFilter />, { store });
  const select = screen.getByTestId('select');

  fireEvent.change(select, { target: { value: selectOptions.All } });
  expect(store.dispatch).toBeCalledWith({
    type: FILTER,
    payload: selectOptions.All
  });

  fireEvent.change(select, { target: { value: selectOptions.Completed } });
  expect(store.dispatch).toBeCalledWith({
    type: FILTER,
    payload: selectOptions.Completed
  });

  fireEvent.change(select, { target: { value: selectOptions.NotCompleted } });
  expect(store.dispatch).toBeCalledWith({
    type: FILTER,
    payload: selectOptions.NotCompleted
  });
});
