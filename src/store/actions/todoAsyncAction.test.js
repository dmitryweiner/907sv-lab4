import {
  ADD,
  ADD_ALL,
  addAllTodos,
  addItem,
  CHECKED,
  checkedItem,
  REMOVE,
  removeTodo,
  SET_REQUEST_STATUS
} from './todoAction';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { selectOptions } from '../reducers/todoReducer';
import { REQUEST_STATUS } from '../../api/Api';
import { initialState as alertInitialState } from '../../store/reducers/alertReducer';
import fetchMock from 'fetch-mock';
import { makeTestStore } from '../../setupTests';

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {
  todo: {
    items: [
      {
        id: '1',
        title: 'title',
        isChecked: false
      }
    ],
    filter: selectOptions.All,
    search: '',
    requestStatus: REQUEST_STATUS.IDLE
  },
  alert: alertInitialState,
  auth: {
    isAuth: true
  }
};

afterEach(() => fetchMock.reset());

test('delete item', async () => {
  const store = mockStore(initialState);

  fetchMock.mock(
    'express:/todos/:id',
    {
      status: 200,
      body: {}
    },
    {
      method: 'DELETE'
    }
  );

  await store.dispatch(removeTodo(initialState.todo.items[0].id));
  expect(store.getActions()).toEqual([
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE },
    { type: REMOVE, payload: initialState.todo.items[0].id }
  ]);
});

test('checked item', async () => {
  fetchMock.mock(
    'express:/todos/:id',
    {
      status: 200,
      body: {
        isChecked: !initialState.todo.items[0].isChecked
      }
    },
    {
      method: 'PUT'
    }
  );
  const store = mockStore(initialState);
  await store.dispatch(
    checkedItem(initialState.todo.items[0].id, !initialState.todo.items[0].isChecked)
  );
  expect(store.getActions()).toEqual([
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE },
    { type: CHECKED, payload: initialState.todo.items[0].id }
  ]);
});

test('Add item async action', async () => {
  const title = 'test';
  const item = {
    id: '1',
    title,
    isChecked: false
  };

  fetchMock.mock(
    'express:/todos',
    {
      status: 200,
      body: item
    },
    {
      method: 'POST'
    }
  );
  const store = makeTestStore({ useMockStore: true });
  await store.dispatch(addItem(title));
  expect(store.getActions()).toEqual([
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE },
    { type: ADD, payload: item }
  ]);
});

test('Add all todos async action', async () => {
  fetchMock.mock(
    'express:/todos',
    {
      status: 200,
      body: initialState.todo.items
    },
    {
      method: 'GET'
    }
  );
  const store = makeTestStore({ useMockStore: true });
  await store.dispatch(addAllTodos());
  expect(store.getActions()).toEqual([
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE },
    { type: ADD_ALL, payload: initialState.todo.items }
  ]);
});
