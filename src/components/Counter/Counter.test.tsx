import React from 'react';
import { screen } from '@testing-library/react';
import { makeTestStore, testRender } from '../../setupTests';
import Counter from './Counter';
import { ListI } from '../../store/interfaces/listInterface';

const initialState: ListI = {
  items: [
    {
      index: Math.random().toString(36).substr(2),
      value: 'test',
      isChecked: false
    }
  ],
  filter: 'All',
  search: ''
};

const store = makeTestStore({ initialState });

test('counter render', () => {
  testRender(<Counter />, { store });
  let counter = screen.getByText('Всего: 1');
  expect(counter).toBeInTheDocument();
});
