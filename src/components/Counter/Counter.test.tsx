import React from 'react';
import { screen } from '@testing-library/react';
import { makeTestStore, testRender } from '../../setupTests';
import Counter from './Counter';
import { Store } from '../../store/reducers';
import { initialState as alertInitialState } from '../../store/reducers/alertReducer';

const initialState: Store = {
  todo: {
    items: [
      {
        index: Math.random().toString(36).substr(2),
        value: 'test',
        isChecked: false
      }
    ],
    filter: 'All',
    search: ''
  },
  alert: alertInitialState
};

const store = makeTestStore({ initialState });

test('counter render', () => {
  testRender(<Counter />, { store });
  let counter = screen.getByText('Всего: 1');
  expect(counter).toBeInTheDocument();
});
