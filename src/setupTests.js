import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer, initialState as originalInitialState } from './store';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const TestProvider = ({ store, children }) => <Provider store={store}>{children}</Provider>;

export function testRender(ui, { store, ...otherOpts }) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts);
}

export function makeTestStore({ initialState = originalInitialState, useMockStore = false } = {}) {
  let store;

  if (useMockStore) {
    if (initialState === undefined) {
      initialState = originalInitialState;
    }
    store = mockStore(initialState);
  } else {
    store = createStore(reducer, initialState);
  }

  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
}
