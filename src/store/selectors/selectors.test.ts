import { ACTION_TYPE, ADD, CHECKED, SEARCH, FILTER } from '../actions/todoAction';
import { initialState as todoInitialState, reducer } from '../reducers/todoReducer';
import { initialState as alertInitialState } from '../reducers/alertReducer';
import { ItemI } from '../interfaces/itemInterface';
import { getSelectFilteredList } from './getSelectFilteredList';
import { getSearchFilteredItems } from './getSearchFilteredItems';
import { getFilteredItemsCount } from './getFilteredItemsCount';
import { Store } from '../reducers';
import { selectOptions } from '../reducers/todoReducer';

const title = 'item';

const newItem: ItemI = {
  id: 'index',
  title: title,
  isChecked: false
};

const newItem2: ItemI = {
  id: 'index1',
  title: 'item2',
  isChecked: false
};

test('get select filtered list', () => {
  let state: Store = {
    todo: todoInitialState,
    alert: alertInitialState,
    auth: {
      isAuth: true
    }
  };

  const action1: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const action2: ACTION_TYPE = {
    type: ADD,
    payload: newItem2
  };

  state = { ...state, todo: reducer(state.todo, action1) };
  state = { ...state, todo: reducer(state.todo, action2) };

  const checkedAction: ACTION_TYPE = {
    type: CHECKED,
    payload: state.todo.items[0].id
  };

  state = { ...state, todo: reducer(state.todo, checkedAction) };

  expect(getSelectFilteredList(state).length).toEqual(2);

  let filterAction: ACTION_TYPE = {
    type: FILTER,
    payload: selectOptions.Completed
  };

  state = { ...state, todo: reducer(state.todo, filterAction) };
  expect(getSelectFilteredList(state).length).toEqual(1);

  filterAction.payload = selectOptions.All;
  state = { ...state, todo: reducer(state.todo, filterAction) };
  expect(getSelectFilteredList(state).length).toEqual(2);

  filterAction.payload = selectOptions.NotCompleted;
  state = { ...state, todo: reducer(state.todo, filterAction) };
  expect(getSelectFilteredList(state).length).toEqual(1);
});

test('filtered items count', () => {
  let state: Store = {
    todo: todoInitialState,
    alert: alertInitialState,
    auth: {
      isAuth: true
    }
  };
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  state.todo = reducer(state.todo, action);
  state.todo = reducer(state.todo, action);
  expect(getFilteredItemsCount(state)).toEqual(2);
  expect(getFilteredItemsCount(state)).not.toEqual(3);
});

test('get search filtered items', () => {
  let state: Store = {
    todo: todoInitialState,
    alert: alertInitialState,
    auth: {
      isAuth: true
    }
  };
  const action1: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const action2: ACTION_TYPE = {
    type: ADD,
    payload: newItem2
  };

  state.todo = reducer(state.todo, action1);
  state.todo = reducer(state.todo, action2);
  expect(state.todo.items.length).toEqual(2);
  expect(getSearchFilteredItems(state).length).toEqual(2);

  const setFilterAction: ACTION_TYPE = {
    type: SEARCH,
    payload: 'item2'
  };

  state = { ...state, todo: reducer(state.todo, setFilterAction) };
  expect(getSearchFilteredItems(state).length).toEqual(1);
});
