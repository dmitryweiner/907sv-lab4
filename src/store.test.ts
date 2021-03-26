import { ACTION_TYPE, ADD, REMOVE, REMOVELIST, CHECKED, FILTER, SEARCH, EDIT } from './store/types';
import {
  getFilteredItemsCount,
  getSearchFilteredItems,
  getSelectFilteredList,
  initialState,
  reducer
} from './store/store';
import { ItemI } from './store/interfaces/itemInterface';

const title = 'item';

const newItem: ItemI = {
  index: 'index',
  value: title,
  isChecked: false
};

const newItem2: ItemI = {
  index: 'index1',
  value: 'item2',
  isChecked: false
};

test('add item', () => {
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const state = reducer(initialState, action);
  expect(state.items.length).toEqual(1);
  expect(state.items[0]).toHaveProperty('index');
  expect(state.items[0].value).toEqual(title);
});

test('remove item', () => {
  const addAction: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  let state = reducer(initialState, addAction);

  const removeAction: ACTION_TYPE = {
    type: REMOVE,
    payload: state.items[0].index
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
    payload: state.items[0].index
  };

  state = reducer(state, checkedAction);

  expect(state.items[0].isChecked).toBeTruthy();
});

test('filtered items count', () => {
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  let state = reducer(initialState, action);
  state = reducer(state, action);
  expect(getFilteredItemsCount(state)).toEqual(2);
  expect(getFilteredItemsCount(state)).not.toEqual(3);
});

test('get search filtered items', () => {
  const action1: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const action2: ACTION_TYPE = {
    type: ADD,
    payload: newItem2
  };

  let state = reducer(initialState, action1);
  state = reducer(state, action2);
  expect(state.items.length).toEqual(2);
  expect(getSearchFilteredItems(state).length).toEqual(2);

  const setFilterAction: ACTION_TYPE = {
    type: SEARCH,
    payload: '2'
  };

  state = reducer(state, setFilterAction);
  console.log(state.filter);
  expect(getSearchFilteredItems(state).length).toEqual(1);
});

test('get select filtered list', () => {
  const action1: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const action2: ACTION_TYPE = {
    type: ADD,
    payload: newItem2
  };

  let state = reducer(initialState, action1);
  state = reducer(state, action2);

  const checkedAction: ACTION_TYPE = {
    type: CHECKED,
    payload: state.items[0].index
  };

  state = reducer(state, checkedAction);

  expect(getSelectFilteredList(state).length).toEqual(2);

  let filterAction: ACTION_TYPE = {
    type: FILTER,
    payload: 'Checked'
  };

  state = reducer(state, filterAction);
  expect(getSelectFilteredList(state).length).toEqual(2);

  filterAction.payload = 'All';
  state = reducer(state, filterAction);
  expect(getSelectFilteredList(state).length).toEqual(2);

  filterAction.payload = 'NotCompleted';
  state = reducer(state, filterAction);
  expect(getSelectFilteredList(state).length).toEqual(1);
});

test('edit item', () => {
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };
  const editAction: ACTION_TYPE = {
    type: EDIT,
    payload: {
      index: 'index',
      newValue: 'editItem'
    }
  };

  let state = reducer(initialState, action);
  state = reducer(state, editAction);

  expect(state.items[0].value).toEqual('editItem');
});
