import { ACTION_TYPE, ADD, CHECKED, SEARCH, FILTER } from '../store/types';
import { initialState, reducer } from '../store/store';
import { ItemI } from '../store/interfaces/itemInterface';
import { getSelectFilteredList } from './getSelectFilteredList';
import { getSearchFilteredItems } from './getSearchFilteredItems';
import { getFilteredItemsCount } from './getFilteredItemsCount';

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
