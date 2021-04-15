import { screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import React from 'react';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES, REQUEST_STATE_TYPES } from '../../store';

test('Форма позволяет вводить данные, вызывает обработчик', () => {
  const store = makeTestStore({ useMockStore: true });
  const value = '19';

  testRender(<Form />, { store });

  const input = screen.getByTestId('input');
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
  expect(store.dispatch).not.toBeCalled();

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.SET_REQUEST_STATE,
    payload: REQUEST_STATE_TYPES.LOADING
  });
});
