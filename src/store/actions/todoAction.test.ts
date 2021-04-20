import { ItemI } from '../interfaces/itemInterface';
import fetchMock from 'fetch-mock';
import { makeTestStore } from '../../setupTests';
import {
  ADD,
  ADD_ALL,
  addAllTodos,
  addItem,
  REMOVE,
  removeTodo,
  SET_REQUEST_STATUS
} from './todoAction';
import { REQUEST_STATUS } from '../../api/Api';
import { TodoI } from '../interfaces/todoInterface';
import { selectOptions } from '../reducers/todoReducer';

const state: TodoI = {
  items: [
    {
      id: '1',
      title: 'test1',
      isChecked: false
    },
    {
      id: '2',
      title: 'test1',
      isChecked: false
    },
    {
      id: '3',
      title: 'test1',
      isChecked: true
    }
  ],
  filter: selectOptions.All,
  search: '',
  requestStatus: REQUEST_STATUS.IDLE
};

afterEach(() => fetchMock.reset());

test('Add item async action', async () => {
  const title = 'test';
  const item: ItemI = {
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
      body: state.items
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
    { type: ADD_ALL, payload: state.items }
  ]);
});

test('Remove item async action', async () => {
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
  const store = makeTestStore({ initialState: state, useMockStore: true });
  await store.dispatch(removeTodo(state.items[0].id));
  expect(store.getActions()).toEqual([
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: SET_REQUEST_STATUS, payload: REQUEST_STATUS.IDLE },
    { type: REMOVE, payload: state.items[0].id }
  ]);
});
