import { ACTION_TYPE, ADD, REMOVE, REMOVELIST, CHECKED, EDIT } from '../actions/todoAction';
import { initialState, reducer } from './todoReducer';
import { ItemI } from '../interfaces/itemInterface';

const title = 'item';

const newItem: ItemI = {
  id: 'index',
  title: title,
  isChecked: false
};

test('add item', () => {
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const state = reducer(initialState, action);
  expect(state.items.length).toEqual(1);
  expect(state.items[0]).toHaveProperty('id');
  expect(state.items[0].title).toEqual(title);
});

test('remove item', () => {
  const addAction: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  let state = reducer(initialState, addAction);

  const removeAction: ACTION_TYPE = {
    type: REMOVE,
    payload: state.items[0].id
  };

  state = reducer(state, removeAction);
  expect(state.items).toHaveLength(0);
});

test('remove list', () => {
  const addAction: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  let state = reducer(initialState, addAction);
  state = reducer(state, addAction);

  const removeList: ACTION_TYPE = {
    type: REMOVELIST
  };

  state = reducer(state, removeList);
  expect(state.items).toHaveLength(0);
});

test('checked item', () => {
  const addAction: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  let state = reducer(initialState, addAction);

  const checkedAction: ACTION_TYPE = {
    type: CHECKED,
    payload: state.items[0].id
  };

  state = reducer(state, checkedAction);

  expect(state.items[0].isChecked).toBeTruthy();
});

test('edit item', () => {
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };
  const editAction: ACTION_TYPE = {
    type: EDIT,
    payload: {
      id: 'id',
      newValue: 'editItem'
    }
  };

  let state = reducer(initialState, action);
  state = reducer(state, editAction);

  expect(state.items[0].title).toEqual('editItem');
});
