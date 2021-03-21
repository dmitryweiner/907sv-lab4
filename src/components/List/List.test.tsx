import React from 'react';
import { screen } from '@testing-library/react';
import List from './List';
import { makeTestStore, testRender } from '../../setupTests';

const store = makeTestStore();

test('render list', () => {
  testRender(<List />, { store });
  const list = screen.getByTestId('list');
  expect(list).toBeInTheDocument();
});
