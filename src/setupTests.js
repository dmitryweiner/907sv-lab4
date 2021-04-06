import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store';

const TestProvider = ({ store, children }) => <Provider store={store}>{children}</Provider>;

export function testRender(ui, { store, ...otherOpts }) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts);
}

export function makeTestStore({ initialState, store = createStore(reducer, initialState) } = {}) {
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
}
