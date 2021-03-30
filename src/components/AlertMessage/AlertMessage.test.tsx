import { makeTestStore, testRender } from '../../setupTests';
import { screen } from '@testing-library/react';
import React from 'react';
import AlertMessage from './AlertMessage';

const store = makeTestStore();
const error = 'error';

test('render alert message', () => {
  testRender(<AlertMessage error={error} />, { store });
  const alert = screen.getByTestId('alert-message');
  expect(alert).toBeInTheDocument();
});

test('render alert message', () => {
  testRender(<AlertMessage error={error} />, { store });
  const alert = screen.getByText('error');
  expect(alert).toBeInTheDocument();
});
