import React from 'react';
import { screen } from '@testing-library/react';
import { makeTestStore, testRender } from '../../setupTests';
import Counter from './Counter';
import { Store } from '../../store/reducers';
import { initialState as alertInitialState } from '../../store/reducers/alertReducer';
import { REQUEST_STATUS } from '../../api/Api';

const initialState: Store = {
  todo: {
    items: [
      {
        id: Math.random().toString(36).substr(2),
        title: 'test',
        isChecked: false
      }
    ],
    filter: 'All',
    search: '',
    requestStatus: REQUEST_STATUS.IDLE
  },
  alert: alertInitialState,
  auth: {
    isAuth: true
  }
};

const store = makeTestStore({ initialState });

test('counter render', () => {
  testRender(<Counter />, { store });
  let counter = screen.getByText('Всего: 1');
  expect(counter).toBeInTheDocument();
});
