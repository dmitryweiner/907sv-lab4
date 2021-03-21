import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { testRender, makeTestStore } from './setupTests';

const store = makeTestStore();

test('render App', () => {
  testRender(<App />, { store });
  const text = screen.getByText('Лабораторная №4 по теме Redux');
  expect(text).toBeInTheDocument();
});
